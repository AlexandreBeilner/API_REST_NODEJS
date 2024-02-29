import type { Knex } from 'knex';
import {ETableNames} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.usuario, tableBuilder => {
        tableBuilder.bigIncrements('id').primary().index();
        tableBuilder.string('nome').notNullable().checkLength('>', 3);
        tableBuilder.string('email').index().unique().notNullable().checkLength('>', 5);
        tableBuilder.string('senha').notNullable().checkLength('>', 6);

        tableBuilder.comment('Tabale utilizada para criar usuarios do sistema');
    }).then(() => {
        console.log(`#Created table ${ETableNames.usuario}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.usuario).then(() => {
        console.log(`#Dropped table ${ETableNames.usuario}`);
    });
}

