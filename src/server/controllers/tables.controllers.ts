import { pool } from "../database/connectDB";
import { Response, Request } from "express";
if (!pool) throw new Error("DB connection error");

const getCustomers = async (req: Request, res: Response) => {
  const response = await pool.query("SELECT * FROM customer ORDER BY id;");
  res.json(response.rows);
};

const getItems = async (req: Request, res: Response) => {
  const response = await pool.query(
    "SELECT product_id, size, color, price, id FROM item;"
  );
  res.json(response.rows);
};

const getProductTypes = async (req: Request, res: Response) => {
  const response = await pool.query("SELECT * FROM product_type");
  res.json(response.rows);
};

const getProducts = async (req: Request, res: Response) => {
  const response = await pool.query("SELECT * FROM product");
  res.json(response.rows);
};

const getSalesItems = async (req: Request, res: Response) => {
  const response = await pool.query("SELECT * FROM sales_item");
  res.json(response.rows);
};

const getSalesPeople = async (req: Request, res: Response) => {
  const response = await pool.query("SELECT * FROM sales_person");
  res.json(response.rows);
};

export default {
  getCustomers,
  getItems,
  getProductTypes,
  getProducts,
  getSalesItems,
  getSalesPeople,
};
