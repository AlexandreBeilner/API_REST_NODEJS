import {ICidade} from '../../models';
import {Knex} from '../../knex';
import {ETableNames} from '../../ETableNames';

export const updateById = async (cidadeId: number, cidadeName: Omit<ICidade, 'id'>):Promise<Error |  void> => {
    try {
        const result = await Knex(ETableNames.cidade).where('id', cidadeId).update({
            nome: cidadeName.nome
        });

        if(result === 0){
            return new Error('Erro ao atualizar registro');
        }else {
            return;
        }

    }catch (e) {
        console.log(e);
        return new Error('Erro ao atualizar registro');
    }
};
