import express from 'express';
import './shared/services/TranlationsYup';
import 'dotenv/config';
import {router} from './routes';

const server = express();

server.use(express.json());
server.use(router);

export {server};
