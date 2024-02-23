import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {CidadesControler} from '../controllers';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Calabreso1 2312412');
});

router.post('/cidades', CidadesControler.create);

export {router};
