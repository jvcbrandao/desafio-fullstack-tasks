import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'; 

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
        res.status(204).send(); // Código 204 indica sucesso, mas sem corpo
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error });
    }
};


export const atualizarTarefa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    try {
        // Validação mínima
        if (!titulo || !status) {
            res.status(400).json({ erro: 'Campos obrigatórios faltando' });
            return;
        }

        // Atualização com mapeamento correto
        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id: Number(id) },
            data: {
                title: titulo,       // Mapeia "titulo" (front) → "title" (BD)
                description: descricao, // Mapeia "descricao" → "description"
                status  
            },
        });

        res.status(200).json(tarefaAtualizada);

    } 
    catch(error){
        console.log(error);
    }
};