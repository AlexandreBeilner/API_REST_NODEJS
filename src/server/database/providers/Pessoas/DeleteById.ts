import {Knex} from '../../knex';
import {ETableNames} from '../../ETableNames';

export const deleteById = async (pessoaId: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa).where('id', pessoaId).del();
        if(result > 0){
            return;
        }
        return new Error('Erro ao apagar registro');

    }catch (e){
        console.log(e);
        return new Error('Erro ao apagar registro');
    }
};
