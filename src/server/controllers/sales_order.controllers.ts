import { pool } from "../database/connectDB";
import { Response, Request } from "express";
import Joi from "joi";
if (!pool) throw new Error("DB connection error");

const schema = Joi.object({
  cname: Joi.string().allow("").label("Customer name"),
  sname: Joi.string().allow("").label("Sales person name"),
  ti: Joi.date().iso().optional().label("From date"),
  tf: Joi.date().iso().optional().label("To date"),
  tgt: Joi.number().label("Total cost greater"),
  tlt: Joi.number().label("Total cost less"),
});

function conditionInjecter(conditions: Array<string>, condition: string) {
  if (conditions.length === 0) {
    conditions.push("WHERE");
    return conditions.push(condition);
  }
  return conditions.push("AND", condition);
}

const getSalesOrders = async (req: Request, res: Response) => {
  let queryArray: Array<string> = ["SELECT * FROM invoice_summary"];
  const conditions: Array<string> = [];
  const values: Array<string> = [];
  let i = 1;
  try {
    if (Object.keys(req.query).length > 0) {
      //customer name
      if (req.query.cname) {
        const { cname } = await schema.validateAsync(req.query);
        conditionInjecter(conditions, `customer_name ILIKE $${i++}`);
        values.push("%" + cname.toString() + "%");
      }

      //sales person name
      if (req.query.sname) {
        const { sname } = await schema.validateAsync(req.query);
        conditionInjecter(conditions, `sales_person_name ILIKE $${i++}`);
        values.push("%" + sname.toString() + "%");
      }

      //query time order taken with initial value
      if (req.query.ti) {
        const { ti } = await schema.validateAsync(req.query);
        conditionInjecter(conditions, `time_order_taken >= $${i++}`);
        console.log(ti.toDateString());
        values.push(ti.toDateString());
      }

      //query time order taken with final value
      if (req.query.tf) {
        const { tf } = await schema.validateAsync(req.query);
        conditionInjecter(conditions, `time_order_taken < $${i++}`);
        console.log(tf.toDateString());
        values.push(tf.toDateString());
      }

      //total cost greater than
      if (req.query.tgt) {
        const { tgt } = await schema.validateAsync(req.query);
        conditionInjecter(conditions, `grandtotal >= $${i++}`);
        values.push(tgt.toString());
      }

      //total cost less than
      if (req.query.tlt) {
        const { tlt } = await schema.validateAsync(req.query);
        conditionInjecter(conditions, `grandtotal < $${i++}`);
        values.push(tlt.toString());
      }
    }

    //send all sales orders

    const queryText = queryArray.concat(conditions).join(" ").concat(" ORDER BY random() LIMIT 30;");
    const response = await pool.query(queryText, values);
    res.json(response.rows);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

export default {
  getSalesOrders,
};
