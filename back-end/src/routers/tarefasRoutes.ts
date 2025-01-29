import { Router } from 'express';
import { criarTarefa, listarTarefas, atualizarTarefa, deletarTarefa } from '../controllers/tarefasController';


const router = Router();

// Rota para criar tarefa
router.post('/tarefas', criarTarefa);

router.get('/tarefas', listarTarefas);

router.put('/tarefas/:id', atualizarTarefa);

router.delete('/tarefas/:id', deletarTarefa); // Rota DELETE

export default router;
