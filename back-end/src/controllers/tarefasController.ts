import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client'; // Importação necessária para tratamento de erros

export const criarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { title, description, status } = req.body; // Campos em inglês

    try {
        // Validação dos campos obrigatórios
        if (!title || !status) {
            res.status(400).json({ erro: 'Campos obrigatórios faltando' });
            return;
        }

        const tarefa = await prisma.tarefa.create({
            data: {
                title,          // Usa diretamente os campos em inglês
                description,
                status,
            },
        });

        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa', error });
    }
};

export const listarTarefas = async (req: Request, res: Response): Promise<void> => {
    try {
        const tarefas = await prisma.tarefa.findMany();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas', error });
    }
};

export const deletarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.tarefa.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        } else {
            res.status(500).json({ message: 'Erro ao deletar tarefa', error });
        }
    }
};

export const atualizarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id: Number(id) },
            data: { title, description, status },
        });
        res.status(200).json(tarefaAtualizada);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                res.status(404).json({ erro: 'Tarefa não encontrada' });
            } else {
                res.status(500).json({ message: 'Erro do Prisma', error });
            }
        } else {
            res.status(500).json({ message: 'Erro interno', error });
        }
    }
};