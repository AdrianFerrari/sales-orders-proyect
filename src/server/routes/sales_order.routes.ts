import { Router } from "express";
import { default as controllers } from "../controllers/sales_order.controllers";
const router = Router();

router.get("/", controllers.getSalesOrders);

export default router;
