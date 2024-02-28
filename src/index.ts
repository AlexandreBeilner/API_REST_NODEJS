import {server} from './server';
import {Knex} from './server/database/knex';

const startServer = () => {
    server.listen(process.env.PORT, () => {
        console.log(`App rodando na porta ${process.env.PORT}`);
    });
};

if(process.env.IS_LOCALHOST !== 'true'){
    Knex.migrate.latest().then(() => {
        Knex.seed.run().then(() => {
            startServer();
        }).catch(console.log);
    }).catch(console.log);
}else {
    startServer();
}
