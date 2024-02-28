import {Request, RequestHandler, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {IPessoa} from '../../database/models';
import {PessoasProvider} from '../../database/providers/Pessoas';

interface IBodyProps extends Omit<IPessoa, 'id'> { }

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nomeCompleto: yup.string().required().min(2),
    email: yup.string().required().min(10),
    cidadeId: yup.number().required().integer().moreThan(0)

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
    const result = await PessoasProvider.create(req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default : result.message,
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};

export {create};
