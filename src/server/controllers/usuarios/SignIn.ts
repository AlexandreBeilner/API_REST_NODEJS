import {IUsuario} from '../../database/models';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {Request, Response} from 'express';
import {UsuariosProvider} from '../../database/providers/Usuarios';
import {StatusCodes} from 'http-status-codes';

interface IBodyProps extends Omit<Omit<IUsuario, 'id'>, 'nome'>{}

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(6)
});

export const signInValidation =
    validation((schema) => ({body: schema<IBodyProps>(bodyValidator)}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);

    const result = await UsuariosProvider.getByEmail(req.body.email);


    if(result instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }

    if(result.email === req.body.email && result.senha === req.body.senha){
        return res.status(StatusCodes.OK).json({accessToken: 'teste.teste.teste'});
    }else{
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }

};

