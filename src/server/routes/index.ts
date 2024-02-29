import {Router} from 'express';
import {CidadesControler} from '../controllers';
import {PessoasControler} from '../controllers/pessoas';
import {UsuariosControler} from '../controllers/usuarios';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Calabreso1 2312412');
});

router.get('/cidades', CidadesControler.getAllValidation, CidadesControler.getAll);
router.post('/cidades', CidadesControler.createValidation, CidadesControler.create);
router.get('/cidades/:id', CidadesControler.getByIdValidation, CidadesControler.getById);
router.put('/cidades/:id', CidadesControler.updateByIdValidation, CidadesControler.updateById);
router.delete('/cidades/:id', CidadesControler.deleteByIdValidation, CidadesControler.deleteById);

router.get('/pessoas', PessoasControler.getAllValidation, PessoasControler.getAll);
router.post('/pessoas', PessoasControler.createValidation, PessoasControler.create);
router.get('/pessoas/:id', PessoasControler.getByIdValidation, PessoasControler.getById);
router.put('/pessoas/:id', PessoasControler.updateByIdValidation, PessoasControler.updateById);
router.delete('/pessoas/:id', PessoasControler.deleteByIdValidation, PessoasControler.deleteById);

router.post('/signIn', UsuariosControler.signInValidation, UsuariosControler.signIn);
router.post('/signUp', UsuariosControler.signUpValidation, UsuariosControler.signUp);

export {router};
