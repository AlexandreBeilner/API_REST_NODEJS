import {Request, RequestHandler, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {ICidade} from '../../database/models';

interface IBodyProps extends Omit<ICidade, 'id'> { }

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3),
});

//isso abaixo é um middlaware, é uma maneira de execurar alguma coisa antes da requisição ser processada
//o next() dentro do try faz ele passar para o proximo metodo da fila
//caso caia no catch ele encera o processo
export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidator.validate(req.body, {abortEarly: false});
        next();
    } catch (e) {
        const yupError = e as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(err => {
            if (!err.path) return;
            errors[err.path] = err.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        });
    }
};

export const createValidation = validation((getSchema) => ({body: getSchema<IBodyProps>(bodyValidator)}));

const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);

    return res.status(StatusCodes.CREATED).json(1);
};

export {create};
