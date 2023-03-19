import { useQuery } from "react-query";
import { getInvoice } from "../api/salesApi";
import { useState, useEffect } from "react";
import Invoices from "./Invoices";
import InvoiceView from "../utils/InvoiceView";
import { useQueryState } from "../hooks/useQueryState";
import { useQueryTextGenerator } from "../hooks/useQueryTextGenerator";

interface dataObject {
  [key: string]: any;
}

function Home() {
  const [isViewShown, setIsViewShown] = useState(false);
  const {
    query,
    conditions,
    handlers: { handleInput, handleSubmit },
  } = useQueryState();

  const [queryText, setQueryText] = useState<Array<JSX.Element>>();
  const { isLoading, data, isError, error } = useQuery<Array<dataObject>, Error>({
    queryKey: [query],
    queryFn: () => getInvoice(query),
  });

  useEffect(() => {
    setQueryText(() => useQueryTextGenerator(conditions));
  }, [conditions]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) throw error;
  if (!data) throw new Error("No Data!");

  return (
    <main className="flex flex-col gap-6 md:p-6 lg:flex-row">
      <header className="flex flex-col gap-4 min-w-[30%]">
        <h1 className="text-3xl font-bold mb-2 underline">Query forms</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1" data-cy="form">
          <label htmlFor="sales_person_name">Sales person name:</label>
          <input
            className="border bg-gray-50"
            type="text"
            id="sales_person_name"
            data-columnname="sales_person_name"
            data-operator="="
            name="sname"
            value={conditions.sname[0]}
            onChange={handleInput}
          />
          <label htmlFor="customer_name">Customers name:</label>
          <input
            className="border bg-gray-50"
            type="text"
            id="customer_name"
            data-columnname="customer_name"
            data-operator="="
            name="cname"
            value={conditions.cname[0]}
            onChange={handleInput}
          />
          <h3>Date of order:</h3>
          <label htmlFor="time_order_initial">From:</label>
          <input
            className="border bg-gray-50"
            type="date"
            id="time_order_initial"
            data-columnname="time_order_taken"
            data-operator=">="
            name="ti"
            value={conditions.ti[0]}
            onChange={handleInput}
          />
          <label htmlFor="time_order_final">To:</label>
          <input
            className="border bg-gray-50"
            type="date"
            id="time_order_final"
            data-columnname="time_order_taken"
            data-operator="<"
            name="tf"
            value={conditions.tf[0]}
            onChange={handleInput}
          />
          <label htmlFor="total_greater">Grand total cost greater or equal to:</label>
          <input
            className="border bg-gray-50"
            type="number"
            id="total_greater"
            data-columnname="grandtotal"
            data-operator=">="
            name="tgt"
            value={conditions.tgt[0]}
            onChange={handleInput}
          />
          <label htmlFor="total_less">Grand total cost lesser than:</label>
          <input
            className="border bg-gray-50"
            type="number"
            id="total_lessr"
            data-columnname="grandtotal"
            data-operator="<"
            name="tlt"
            value={conditions.tlt[0]}
            onChange={handleInput}
          />
          <div>{queryText}</div>
          <button className="border-2 mt-4 border-black bg-white active:bg-black active:text-white">
            Submit query
          </button>
        </form>
        <button onClick={() => setIsViewShown(true)} className="underline text-blue-500 px-4 py-2">
          invoice_summary VIEW
        </button>
        {isViewShown && (
          <div
            onClick={() => setIsViewShown(false)}
            className="flex flex-col absolute inset-0 justify-center items-center"
          >
            <div className="flex flex-col bg-white border border-black max-w-md gap-2 p-2 shadow-md shadow-gray-400">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold underline">invoice_summary</h2>
                <button onClick={() => setIsViewShown(false)}>[ x ]</button>
              </div>
              <InvoiceView />
            </div>
          </div>
        )}
      </header>
      <section className="flex flex-col gap-6 items-center max-w-2xl m-auto" data-cy="invoices">
        <Invoices data={data} />
      </section>
    </main>
  );
}

export default Home;
