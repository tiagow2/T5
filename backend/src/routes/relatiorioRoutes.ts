import { Router } from 'express';
import * as relatorioController from '../controllers/relatorioController';

const router = Router();

// A rota deve ser exatamente esta:
router.get('/top-clientes-quantidade', relatorioController.getTop10ClientesQuantidade);
router.get('/itens-mais-consumidos', relatorioController.getItensMaisConsumidos);

export default router;