import * as create from './Greate';
import * as getById from './GetByEmail';

export const UsuariosProvider = {
    ...create,
    ...getById
};
