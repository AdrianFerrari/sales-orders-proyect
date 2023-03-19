import axios from "axios";

function UserError(this: any, error: any) {
  this.message = error.message;
  this.databaseError = error.response.data.message;
  this.status = error.response.status;
  this.statusText = error.response.statusText;
}

const api = axios.create({
  baseURL: process.env.BASE_URL_API,
});

const getCustomers = async () => {
  try {
    const res = await api.get("/tables/customer");
    const data = res.data.map((e) => {
      const newBirthDate = new Date(e.birth_date).toLocaleDateString("es-AR");
      const newDateEntered = new Date(e.date_entered).toLocaleDateString("es-AR");
      return {
        ...e,
        birth_date: newBirthDate,
        date_entered: newDateEntered,
      };
    });
    return data;
  } catch (error: any) {
    throw new UserError(error);
  }
};

const getItems = async () => {
  try {
    const res = await api.get("/tables/item");
    return res.data;
  } catch (error) {
    throw new UserError(error);
  }
};

const getProductTypes = async () => {
  try {
    const res = await api.get("/tables/product_type");
    return res.data;
  } catch (error: any) {
    throw new UserError(error);
  }
};

const getProducts = async () => {
  try {
    const res = await api.get("/tables/product");
    return res.data;
  } catch (error: any) {
    throw new UserError(error);
  }
};

const getSalesItems = async () => {
  try {
    const res = await api.get("/tables/sales_item");
    const data = res.data.map((e) => {
      const newTaxable = new Boolean(e.taxable).toString();
      return {
        ...e,
        taxable: newTaxable,
      };
    });
    return data;
  } catch (error: any) {
    throw new UserError(error);
  }
};

const getSalesPersons = async () => {
  try {
    const res = await api.get("/tables/sales_person");
    const data = res.data.map((e) => {
      const newBirthDate = new Date(e.birth_date).toLocaleDateString("es-AR");
      const newDateHired = new Date(e.date_hired).toLocaleDateString("es-AR");
      return {
        ...e,
        birth_date: newBirthDate,
        date_hired: newDateHired,
      };
    });
    return data;
  } catch (error: any) {
    throw new UserError(error);
  }
};

export const getInvoice = async (query) => {
  try {
    const res = await api.get(query);
    const data = res.data.map((e) => {
      const newOrderTimeTaken = new Date(e.order_time_taken).toLocaleDateString("es-AR");
      const newProducts = e.products.map((product) => {
        return {
          ...product,
          total: Number.parseFloat(product.total).toFixed(2),
        };
      });
      return {
        ...e,
        order_time_taken: newOrderTimeTaken,
        grandtotal: Number.parseFloat(e.grandtotal).toFixed(2),
        products: newProducts,
      };
    });
    return data;
  } catch (error: any) {
    throw new UserError(error);
  }
};

export default {
  getCustomers,
  getItems,
  getProductTypes,
  getProducts,
  getSalesItems,
  getSalesPersons,
};
