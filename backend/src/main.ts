// main.ts

import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import ormConfig from '../ormconfig';
import { useExpressServer } from 'routing-controllers';

import { Container } from 'typedi';
import { useContainer } from 'routing-controllers'

import cors from 'cors';

import { ProdutoController } from './controllers/ProdutoController';
import { CategoriaController } from './controllers/CategoriaController';


async function startServer() {
    try {
        // Utiliza as configurações importadas ao invés de buscar um arquivo ormconfig.json
        await createConnection(ormConfig);

        useContainer(Container);
        
        const app = express();
        
        app.use(express.json());

        app.use(cors());

        
        useExpressServer(app, {
            controllers: [ProdutoController, CategoriaController], 
            cors: true
        });
        
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

startServer();
