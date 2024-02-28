import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {IPessoa} from '../../database/models';
import {PessoasProvider} from '../../database/providers/Pessoas';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> { }

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().min(10),
    cidadeId: yup.number().integer().required().moreThan(0)
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
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: {
                default: 'O parametro "id" precisa ser informado'
            }
        });
    }

    const result = await PessoasProvider.updateById(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default : result.message,
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send(result);
};


