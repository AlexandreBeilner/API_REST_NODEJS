import {Request, Response} from 'express';
import * as yup from 'yup';

interface ICidade {
    nome: string,
    estado: string
}

const bodyValidator: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validateData: ICidade | undefined = undefined;
    try {
        validateData = await bodyValidator.validate(req.body, {abortEarly: false});
    }catch (e){
        const yupError = e as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(err => {
            if(!err.path) return;
            errors[err.path] = err.message;
        });

        return res.json({
            errors
        });
    }


    console.log(validateData);


    return res.send('Criado');
};

export {create};
