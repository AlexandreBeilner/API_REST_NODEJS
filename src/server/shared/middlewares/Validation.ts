import {RequestHandler} from 'express';
import * as yup from 'yup';
import {StatusCodes} from 'http-status-codes';
import {ValidationError} from 'yup';

type TPropety = 'body' |'header' |'params' |'query';

type TGetSchema = <T>(schema: yup.Schema<T>) => yup.Schema;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TAllSchemas = Record<TPropety, yup.Schema>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;
export const validation: TValidation = (getAllSchemas) =>  async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TPropety], {abortEarly: false});
        }catch (e){
            const yupError = e as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(err => {
                if(!err.path) return;
                errors[err.path] = err.message;
            });

            errorsResult[key]=errors;
        }
    });

    if(Object.entries(errorsResult).length === 0){
        return next();
    }else {
        return res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult});
    }
};

