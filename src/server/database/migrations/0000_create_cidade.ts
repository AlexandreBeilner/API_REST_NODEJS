import type { Knex } from 'knex';
import {ETableNames} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.cidade, tableBuilder => {
        tableBuilder.bigIncrements('id').primary().index();
        tableBuilder.string('nome', 150).index().notNullable();
        tableBuilder.comment('Tabale utilizada para criar cidades do sistema');
    }).then(() => {
        console.log(`#Created table ${ETableNames.cidade}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.cidade).then(() => {
        console.log(`#Dropped table ${ETableNames.cidade}`);
    });
}

