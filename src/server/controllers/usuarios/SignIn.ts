import {IUsuario} from '../../database/models';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {Request, Response} from 'express';
import {UsuariosProvider} from '../../database/providers/Usuarios';
import {StatusCodes} from 'http-status-codes';
import {JWTService, PasswordCrypto} from '../../shared/services';

interface IBodyProps extends Omit<Omit<IUsuario, 'id'>, 'nome'>{}

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(6)
});

export const signInValidation =
    validation((schema) => ({body: schema<IBodyProps>(bodyValidator)}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);

    const usuario = await UsuariosProvider.getByEmail(req.body.email);


    if(usuario instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }
    const matchPassword = await PasswordCrypto.verifyPassword(req.body.senha, usuario.senha);
    if(matchPassword){
        const accessToken = JWTService.sign({uid: usuario.id});
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar token de acesso'
                }
            });
        }
        return res.status(StatusCodes.OK).json({accessToken: accessToken});
    }else{
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }

};

