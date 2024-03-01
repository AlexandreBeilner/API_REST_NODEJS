import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {CidadesProvider} from '../../database/providers/Cidades';

interface IQuerryProps {
    id?:number | null;
    page?: number | null;
    limit?: number | null;
    filter?: string | null;
}

const queryValidator: yup.Schema<IQuerryProps> = yup.object().shape({
    page: yup.number().nullable().notRequired().moreThan(0),
    limit: yup.number().nullable().notRequired().moreThan(0),
    id: yup.number().integer().notRequired().default(0),
    filter: yup.string().notRequired()
});

export const getAllValidation = validation((getSchema) => ({query: getSchema<IQuerryProps>(queryValidator)}));

export const getAll = async (req: Request<{}, {}, {}, IQuerryProps>, res: Response) => {
    const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id || 0));
    const count = await CidadesProvider.count(req.query.filter as string | undefined);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }else if(count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        });
    }

    res.setHeader('acess-control-ecpose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);


    return res.status(StatusCodes.OK).send(result);
};


