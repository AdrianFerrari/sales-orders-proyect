import { JsxElement } from "typescript";
import Invoice from "./Invoice";
import { useEffect, useState } from "react";

function createInvoiceList(data: Array<Object>) {
  const result =
    data.length > 0 ? (
      data?.map((invoice, i) => {
        return <Invoice key={i} data={invoice} />;
      })
    ) : (
      <span>No Results</span>
    );
  return result;
}

function Invoices({ data }) {
  const [invoices, setInvoices] = useState(() => {
    createInvoiceList(data);
  });

  useEffect(() => {
    setInvoices(() => createInvoiceList(data));
  }, [data]);

  return <>{invoices}</>;
}

export default Invoices;
