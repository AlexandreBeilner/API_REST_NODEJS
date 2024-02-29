import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {IPessoa} from '../../database/models';
import {PessoasProvider} from '../../database/providers/Pessoas';

interface IBodyProps extends Omit<IPessoa, 'id'> { }

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nomeCompleto: yup.string().required().min(2),
    email: yup.string().required().email(),
    cidadeId: yup.number().required().integer().moreThan(0)
});

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
