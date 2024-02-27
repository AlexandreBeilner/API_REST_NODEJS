import {testServer} from '../jest.setup';
import {StatusCodes} from 'http-status-codes';

describe('Cidades - create', () => {
    it('Criar registro', async () => {
        const res1 = await testServer.post('/cidades').send({
            nome: 'Chapeco'
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Testa criar um registro com nome muito curto', async () => {
        const res1 = await testServer.post('/cidades').send({
            nome: 'Ch'
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});
