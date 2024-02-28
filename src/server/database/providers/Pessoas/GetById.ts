import {Knex} from '../../knex';
import {IPessoa} from '../../models';
import {ETableNames} from '../../ETableNames';

export const getById = async (pessoaId: number): Promise<IPessoa | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa).select('*').where('id', pessoaId).first();
        if(result){
            return result;
        }
        return new Error('Registro não encontrado');
    }catch (e) {
        console.log(e);
        return new Error('Erro ao consultar registro');
    }
};
