import {testServer} from '../jest.setup';
import {StatusCodes} from 'http-status-codes';

describe('Cidades - DeleteById', () => {
    it('Deletar cidade', async () => {
        const res1 = await testServer.delete('/cidades/1');

        expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});
