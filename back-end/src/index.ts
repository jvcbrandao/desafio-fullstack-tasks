import express from 'express';
import dotenv from 'dotenv';
import tarefasRoutes from './routers/tarefasRoutes'; // Importa as rotas

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

async function main(): Promise<void> {

    const app = express();

    app.use(express.json()); // Middleware para parsear JSON

    // Usa as rotas de tarefas
    app.use('/', tarefasRoutes); // Prefixa as rotas com '/api' (ou o que preferir)

    app.listen(process.env.PORT, (): void => {
        console.log(`Server running at http://localhost:${process.env.PORT}/`);
    });
}

main();