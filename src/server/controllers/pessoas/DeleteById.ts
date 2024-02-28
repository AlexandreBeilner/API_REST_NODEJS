import {Request, Response} from 'express';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares';
import {StatusCodes} from 'http-status-codes';
import {PessoasProvider} from '../../database/providers/Pessoas';

export interface IParamProps {
    id?: number;
}

const paramsValidator: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

export const deleteByIdValidation = validation((getSchema) => ({params: getSchema<IParamProps>(paramsValidator)}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: {
                default: 'O parametro "id" precisa ser informado'
            }
        });
    }
    const result = await PessoasProvider.deleteById(req.params.id);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default : result.message,
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};


