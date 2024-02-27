import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {ICidade} from '../../database/models';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> { }

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3),
});

const paramsValidator: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

export const updateByIdValidation =
    validation((getSchema) => (
        {
            params: getSchema<IParamProps>(paramsValidator),
            body: getSchema<IBodyProps>(bodyValidator),
        }));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.OK).send('Não implementado');
};


