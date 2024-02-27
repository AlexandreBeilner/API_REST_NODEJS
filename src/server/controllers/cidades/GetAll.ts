import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';

interface IQuerryProps {
    page?: number | null;
    limit?: number | null;
    filter?: string | null;
}

const queryValidator: yup.Schema<IQuerryProps> = yup.object().shape({
    page: yup.number().nullable().notRequired().moreThan(0),
    limit: yup.number().nullable().notRequired().moreThan(0),
    filter: yup.string().notRequired()
});

export const getAllValidation = validation((getSchema) => ({query: getSchema<IQuerryProps>(queryValidator)}));

export const getAll = async (req: Request<{}, {}, {}, IQuerryProps>, res: Response) => {
    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};


