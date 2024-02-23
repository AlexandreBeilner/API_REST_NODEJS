import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Calabreso1 2312412');
});

router.post('/teste', (req, res) => {
    console.log(req.body);
    return res.status(StatusCodes.BAD_REQUEST).json(req.body);
});

export {router};
