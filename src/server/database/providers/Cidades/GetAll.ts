import {ICidade} from '../../models';
import {Knex} from '../../knex';
import {ETableNames} from '../../ETableNames';

/**
 *
 * @param page
 * @param limit
 * @param filter
 * @param id
 */
export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
    try {
        // Inicializa uma consulta na tabela 'cidade'
        const result = await Knex(ETableNames.cidade)
            // Seleciona todas as colunas dos registros retornados
            .select('*')
            // Adiciona uma cláusula WHERE à consulta, filtrando os registros para incluir apenas aqueles cujo campo 'id' corresponde ao valor de `id` fornecido
            .where('id', Number(id))
            // Adiciona uma cláusula OR WHERE à consulta, filtrando os registros para incluir aqueles cujo campo 'nome' corresponde ao padrão fornecido por `filter`
            .orWhere('nome', 'like', `%${filter}%`)
            // Pula um número específico de registros, útil para implementar a paginação
            .offset((page-1) * limit)
            // Limita o número de registros retornados pela consulta, útil para implementar a paginação
            .limit(limit);

        if(id>0 && result.every(item => item.id !== id)){
            const resultById =
                await Knex(ETableNames.cidade)
                    .select('*')
                    .where('id', id)
                    .first();

            if(resultById) return [...result, resultById];
        }

        return result;
    }catch (e){
        console.log(e);
        return new Error('Error ao consultar registros');
    }
};
