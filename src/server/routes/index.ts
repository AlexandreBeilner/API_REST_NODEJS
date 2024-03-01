import {Router} from 'express';
import {CidadesControler} from '../controllers';
import {PessoasControler} from '../controllers/pessoas';
import {UsuariosControler} from '../controllers/usuarios';
import {ensureAuthenticated} from '../shared/middlewares';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Calabreso1 2312412');
});

router.get('/cidades',ensureAuthenticated, CidadesControler.getAllValidation, CidadesControler.getAll);
router.post('/cidades',ensureAuthenticated, CidadesControler.createValidation, CidadesControler.create);
router.get('/cidades/:id',ensureAuthenticated, CidadesControler.getByIdValidation, CidadesControler.getById);
router.put('/cidades/:id',ensureAuthenticated, CidadesControler.updateByIdValidation, CidadesControler.updateById);
router.delete('/cidades/:id',ensureAuthenticated, CidadesControler.deleteByIdValidation, CidadesControler.deleteById);

router.get('/pessoas',ensureAuthenticated, PessoasControler.getAllValidation, PessoasControler.getAll);
router.post('/pessoas',ensureAuthenticated, PessoasControler.createValidation, PessoasControler.create);
router.get('/pessoas/:id',ensureAuthenticated, PessoasControler.getByIdValidation, PessoasControler.getById);
router.put('/pessoas/:id',ensureAuthenticated, PessoasControler.updateByIdValidation, PessoasControler.updateById);
router.delete('/pessoas/:id',ensureAuthenticated, PessoasControler.deleteByIdValidation, PessoasControler.deleteById);

router.post('/signIn', UsuariosControler.signInValidation, UsuariosControler.signIn);
router.post('/signUp', UsuariosControler.signUpValidation, UsuariosControler.signUp);

export {router};
