import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {ICidade} from '../../database/models';
import {CidadesProvider} from '../../database/providers/Cidades';

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
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: {
                default: 'O parametro "id" precisa ser informado'
            }
        });
    }

    const result = await CidadesProvider.updateById(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default : result.message,
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send(result);
};


