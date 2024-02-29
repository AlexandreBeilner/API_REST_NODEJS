import {Knex} from '../../knex';
import {IUsuario} from '../../models';
import {ETableNames} from '../../ETableNames';

export const getByEmail = async (userMail: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETableNames.usuario).select('*').where('email', userMail).first();
        if(result){
            return result;
        }
        return new Error('Registro não encontrado');
    }catch (e) {
        console.log(e);
        return new Error('Erro ao consultar registro');
    }
};
