import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'; 

// Função para adicionar uma nova tarefa
export const criarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { titulo, descricao, status } = req.body;

    try {
        // Inserir a tarefa no banco de dados
        const tarefa = await prisma.tarefa.create({
            data: {
                title: titulo,          // Mapeando 'titulo' para 'title'
                description: descricao, // Mapeando 'descricao' para 'description'
                status,
            },
        });

        res.status(201).json(tarefa); // Retorna a tarefa criada
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa', error });
    }
};


export const listarTarefas = async (req: Request, res: Response): Promise<void> => {
    try {
        // Buscar todas as tarefas no banco de dados
        const tarefas = await prisma.tarefa.findMany();

        // Retorna as tarefas
        res.status(200).json(tarefas);
    } catch (error) {
        // Caso haja erro, retornar um erro 500
        res.status(500).json({ message: 'Erro ao buscar tarefas', error });
    }
};


export const atualizarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Pegando o ID da tarefa a ser atualizada
    const { title, description, status } = req.body;

    try {
        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id: Number(id) }, 
            data: {
                title: title,          // Certifique-se de que 'titulo' seja o campo no corpo da requisição
                description: description, // Certifique-se de que 'descricao' seja o campo no corpo da requisição
                status,
            },
        });

        console.log(tarefaAtualizada); // Verifique se a tarefa foi atualizada corretamente

        // Retorna a tarefa atualizada
        res.status(200).json(tarefaAtualizada);
    } catch (error) {
        console.error(error); // Adicione para ver o erro exato
        res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
    }
};

export const deletarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await prisma.tarefa.delete({
            where: { id: Number(id) },
        });
        res.status(204).send(); // Código 204 indica sucesso, mas sem corpo
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error });
    }
};

