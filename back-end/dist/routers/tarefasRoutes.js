"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarefasController_1 = require("../controllers/tarefasController");
const router = (0, express_1.Router)();
// Rota para criar tarefa
router.post('/tarefas', tarefasController_1.criarTarefa);
router.get('/tarefas', tarefasController_1.listarTarefas);
router.put('/tarefas/:id', tarefasController_1.atualizarTarefa);
router.delete('/tarefas/:id', tarefasController_1.deletarTarefa); // Rota DELETE
exports.default = router;
