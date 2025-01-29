import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa o pacote CORS
import tarefasRoutes from './routers/tarefasRoutes'; // Importa as rotas

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

async function main(): Promise<void> {
    const app = express();

    // Habilita o CORS para aceitar requisições do frontend (localhost:3000)
    app.use(cors({
        origin: 'http://localhost:3000',  // Permite acesso apenas da sua aplicação React
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Permite os métodos desejados
        allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeçalhos permitidos
    }));

    app.use(express.json()); // Middleware para parsear JSON

    // Usa as rotas de tarefas
    app.use('/', tarefasRoutes); // Prefixa as rotas com '/' (ou o que preferir)

    // Inicia o servidor
    app.listen(process.env.PORT, (): void => {
        console.log(`Server running at http://localhost:${process.env.PORT}/`);
    });
}

main();
