import {IUsuario} from '../../database/models';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {Request, Response} from 'express';
import {UsuariosProvider} from '../../database/providers/Usuarios';
import {StatusCodes} from 'http-status-codes';



interface IBodyProps extends Omit<IUsuario, 'id'>{}

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nome:  yup.string().required().min(3),
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6)
});

export const signUpValidation =
    validation((schema) => ({body: schema<IBodyProps>(bodyValidator)}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);

    const result = await UsuariosProvider.create(req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);

};
