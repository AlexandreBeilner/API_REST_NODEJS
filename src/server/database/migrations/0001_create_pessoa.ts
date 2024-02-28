import type { Knex } from 'knex';
import {ETableNames} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.pessoa, tableBuilder => {
        tableBuilder.bigIncrements('id').primary().index();
        tableBuilder.string('nomeCompleto').index().notNullable();
        tableBuilder.string('email').unique().notNullable();

        tableBuilder
            .bigInteger('cidadeId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.cidade)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        tableBuilder.comment('Tabale utilizada para criar pessoas do sistema');
    }).then(() => {
        console.log(`#Created table ${ETableNames.pessoa}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pessoa).then(() => {
        console.log(`#Dropped table ${ETableNames.pessoa}`);
    });
}

