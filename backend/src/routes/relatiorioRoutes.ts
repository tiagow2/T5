import { Router } from 'express';
import * as relatorioController from '../controllers/relatorioController';

const router = Router();

router.get('/top-clientes-quantidade', relatorioController.getTop10ClientesQuantidade);
router.get('/itens-mais-consumidos', relatorioController.getItensMaisConsumidos);
router.get('/top5-clientes-valor', relatorioController.getTop5ClientesValor);

export default router;