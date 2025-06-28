
import express from "express";
const router = express.Router();

import * as controller from "../controllers/consumoController";

router.get("/", controller.listar);
router.post("/", controller.cadastrar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

export default router;