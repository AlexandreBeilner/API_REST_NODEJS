import {Router} from 'express';
import {CidadesControler} from '../controllers';
import {PessoasControler} from '../controllers/pessoas';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Calabreso1 2312412');
});

router.get('/cidades', CidadesControler.getAllValidation, CidadesControler.getAll);
router.get('/cidades/:id', CidadesControler.getByIdValidation, CidadesControler.getById);
router.post('/cidades', CidadesControler.createValidation, CidadesControler.create);
router.put('/cidades/:id', CidadesControler.updateByIdValidation, CidadesControler.updateById);
router.delete('/cidades/:id', CidadesControler.deleteByIdValidation, CidadesControler.deleteById);

router.get('/pessoas', PessoasControler.getAllValidation, PessoasControler.getAll);
router.post('/pessoas', PessoasControler.createValidation, PessoasControler.create);

export {router};
