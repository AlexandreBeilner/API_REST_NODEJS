import {IPessoa} from '../../models';
import {Knex} from '../../knex';
import {ETableNames} from '../../ETableNames';

export const updateById = async (pessoaId: number, pessoaInfo: Omit<IPessoa, 'id'>):Promise<Error |  void> => {
    try {
        const [{count}] = await Knex(ETableNames.cidade)
            .where('id', pessoaInfo.cidadeId)
            .count<[{count: number}]>('* as count');
        if(count === 0){
            return new Error('A cidade usada no cadastro nao foi encontrada');
        }
        const result = await Knex(ETableNames.pessoa).update(pessoaInfo).where('id', pessoaId);

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
