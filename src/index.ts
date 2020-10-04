import "reflect-metadata";
import { createConnection } from 'typeorm'; // crateconnection do typeorm para criar a conexão com o banco de dados e gerar as tabelas automaticamentes de acordo com as entidades.
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";

// Iniciando o App
// https://www.npmjs.com/package/express

const app = express();
createConnection() 

// No request da aplicação os dados enviados serão no formato de .json
app.use(bodyParser.json()) 

// Adicionando as rotas na aplicação
app.use(routes) 

// A aplicação roda na porta 3333
app.listen(3333)