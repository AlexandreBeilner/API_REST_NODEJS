import {server} from './server';
import 'dotenv/config';

server.listen(process.env.PORT, () => {
    console.log(`App rodando na porta ${process.env.PORT}`);
});
