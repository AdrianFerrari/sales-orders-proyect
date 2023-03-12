import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "./utils/Table";
import Home from "./components/Home";
import { default as api } from "./api/salesApi";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "customers",
        element: <Table getFunction={api.getCustomers} title="customers" />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "items",
        element: <Table getFunction={api.getItems} title="items" />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "products",
        element: <Table getFunction={api.getProducts} title="products" />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "product_types",
        element: <Table getFunction={api.getProductTypes} title="product_types" />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "sales_items",
        element: <Table getFunction={api.getSalesItems} title="sales_items" />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "sales_people",
        element: <Table getFunction={api.getSalesPersons} title="sales_people" />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
