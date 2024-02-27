import {testServer} from '../jest.setup';
import {StatusCodes} from 'http-status-codes';

describe('Cidades - UpdateById', () => {
    it('Atualizar nome da cidade', async () => {
        const res1 = await testServer.put('/cidades/1').send({
            nome: 'Camavinga'
        });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
    });
    it('Passar um parametro invalido',async () => {
        const res2 = await testServer.put('/cidades/teste').send({
            nome: 'Carazinho',
        });

        expect(res2.body).toHaveProperty('errors.params.id');
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
