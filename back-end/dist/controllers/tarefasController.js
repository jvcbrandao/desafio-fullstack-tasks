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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarTarefa = exports.atualizarTarefa = exports.listarTarefas = exports.criarTarefa = void 0;
const prisma_1 = require("../lib/prisma");
// Função para adicionar uma nova tarefa
const criarTarefa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descricao, status } = req.body;
    try {
        // Inserir a tarefa no banco de dados
        const tarefa = yield prisma_1.prisma.tarefa.create({
            data: {
                title: titulo, // Mapeando 'titulo' para 'title'
                description: descricao, // Mapeando 'descricao' para 'description'
                status,
            },
        });
        res.status(201).json(tarefa); // Retorna a tarefa criada
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa', error });
    }
});
exports.criarTarefa = criarTarefa;
const listarTarefas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar todas as tarefas no banco de dados
        const tarefas = yield prisma_1.prisma.tarefa.findMany();
        // Retorna as tarefas
        res.status(200).json(tarefas);
    }
    catch (error) {
        // Caso haja erro, retornar um erro 500
        res.status(500).json({ message: 'Erro ao buscar tarefas', error });
    }
});
exports.listarTarefas = listarTarefas;
const atualizarTarefa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Pegando o ID da tarefa a ser atualizada
    const { title, description, status } = req.body;
    try {
        const tarefaAtualizada = yield prisma_1.prisma.tarefa.update({
            where: { id: Number(id) },
            data: {
                title: title, // Certifique-se de que 'titulo' seja o campo no corpo da requisição
                description: description, // Certifique-se de que 'descricao' seja o campo no corpo da requisição
                status,
            },
        });
        console.log(tarefaAtualizada); // Verifique se a tarefa foi atualizada corretamente
        // Retorna a tarefa atualizada
        res.status(200).json(tarefaAtualizada);
    }
    catch (error) {
        console.error(error); // Adicione para ver o erro exato
        res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
    }
});
exports.atualizarTarefa = atualizarTarefa;
const deletarTarefa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.prisma.tarefa.delete({
            where: { id: Number(id) },
        });
        res.status(204).send(); // Código 204 indica sucesso, mas sem corpo
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error });
    }
});
exports.deletarTarefa = deletarTarefa;
