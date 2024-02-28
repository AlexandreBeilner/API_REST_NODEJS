import {IPessoa} from '../../models';
import {Knex} from '../../knex';
import {ETableNames} from '../../ETableNames';

/**
 *
 * @param page
 * @param limit
 * @param filter
 */
export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
    try {
        // Inicializa uma consulta na tabela 'cidade'
        const result = await Knex(ETableNames.pessoa)
            // Seleciona todas as colunas dos registros retornados
            .select('*')
            // Adiciona uma cláusula WHERE à consulta, filtrando os registros para incluir apenas aqueles cujo campo 'id' corresponde ao valor de `id` fornecido
            .where('nomeCompleto', 'like', `%${filter}%`)
            // Pula um número específico de registros, útil para implementar a paginação
            .offset((page-1) * limit)
            // Limita o número de registros retornados pela consulta, útil para implementar a paginação
            .limit(limit);

        return result;
    }catch (e){
        console.log(e);
        return new Error('Error ao consultar registros');
    }
};
