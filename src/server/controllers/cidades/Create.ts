import {Request, RequestHandler, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {ICidade} from '../../database/models';
import {CidadesProvider} from '../../database/providers/Cidades';

interface IBodyProps extends Omit<ICidade, 'id'> { }

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3).max(150),
});


export const createValidation = validation((getSchema) => ({body: getSchema<IBodyProps>(bodyValidator)}));

const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);
    const result = await CidadesProvider.create(req.body);

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
