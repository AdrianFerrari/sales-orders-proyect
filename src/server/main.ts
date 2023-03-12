import express from "express";
import ViteExpress from "vite-express";
import tablesRoutes from "./routes/tables.routes";
import salesOrderRoutes from "./routes/sales_order.routes";

const app = express();
ViteExpress.config({ mode: "production" });
const port = parseInt(process.env.PORT!) || 3000;

app.use("/tables", tablesRoutes);
app.use("/sales_order", salesOrderRoutes);

ViteExpress.listen(app, port, () => console.log("Server is listening on port 3000..."));
