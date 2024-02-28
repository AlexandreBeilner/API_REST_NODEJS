import {Knex} from '../../knex';
import {ETableNames} from '../../ETableNames';

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{count}] = await Knex(ETableNames.cidade)
            .where('nome', 'like', `%${filter}%`)
            .count<[{count: number}]>('* as count');

        if(Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao consultar o numro total de registros');
    }catch (e){
        console.log(e);
        return new Error('Erro ao consultar o numro total de registros');
    }
};
