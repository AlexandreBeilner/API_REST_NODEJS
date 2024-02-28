import {Knex} from '../../knex';
import {ICidade} from '../../models';
import {ETableNames} from '../../ETableNames';

export const getById = async (cidadeId: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).select('*').where('id', cidadeId).first();
        if(result){
            return result;
        }
        return new Error('Registro não encontrado');
    }catch (e) {
        console.log(e);
        return new Error('Erro ao consultar registro');
    }
};
