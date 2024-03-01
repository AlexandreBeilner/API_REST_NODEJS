import {knex} from 'knex';
import {development, test, production} from './Environment';
import 'dotenv/config';
import pg from 'pg';

if(process.env.NODE_ENV === 'production'){
    pg.types.setTypeParser(20, 'text', parseInt);
}

const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
    case 'test':
        return test;
    case 'production':
        return production;
    default:
        return development;
    }
};

export const Knex = knex(getEnvironment());
