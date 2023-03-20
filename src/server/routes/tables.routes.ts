import { Router } from "express";
import { default as controllers } from "../controllers/tables.controllers";
const router = Router();

router.get("/customer", controllers.getCustomers);

router.get("/item", controllers.getItems);

router.get("/product_type", controllers.getProductTypes);

router.get("/product", controllers.getProducts);

router.get("/sales_item", controllers.getSalesItems);

router.get("/sales_person", controllers.getSalesPeople);

router.get("/sales_order", controllers.getSalesOrders);

export default router;
