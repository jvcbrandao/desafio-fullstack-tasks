"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Importa o pacote CORS
const tarefasRoutes_1 = __importDefault(require("./routers/tarefasRoutes")); // Importa as rotas
// Carrega as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // Habilita o CORS para aceitar requisições do frontend (localhost:3000)
        app.use((0, cors_1.default)({
            origin: 'http://localhost:3000', // Permite acesso apenas da sua aplicação React
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite os métodos desejados
            allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
        }));
        app.use(express_1.default.json()); // Middleware para parsear JSON
        // Usa as rotas de tarefas
        app.use('/', tarefasRoutes_1.default); // Prefixa as rotas com '/' (ou o que preferir)
        // Inicia o servidor
        app.listen(process.env.PORT, () => {
            console.log(`Server running at http://localhost:${process.env.PORT}/`);
        });
    });
}
main();
