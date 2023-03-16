import CreateTable from "../utils/CreateTable";

function Invoice({ data }) {
  return (
    <main className="flex flex-col min-w-full gap-2 bg-gray-50 p-3 border border-black" data-cy="invoice">
      <header className="flex justify-between text-3xl font-bold">
        <h1>Shoe Solution</h1>
        <h1>INVOICE</h1>
      </header>
      <section className="columns-2">
        <p>123 Main Steet, City, State</p>
        <p>shoesolution.com</p>
        <p>411-1234-5678</p>
        <p>Purchase Order:{data.purchase_order_number}</p>
        <p data-cy="time_order_taken">Time/Date:{data.time_order_taken}</p>
        <p data-cy="sales_person_name">Sales Person:{data.sales_person_name}</p>
      </section>
      <section className="flex flex-col">
        <h2 className="font-bold">BILL TO</h2>
        <div className="columns-2">
          <p data-cy="customer_name">Name: {data.customer_name}</p>
          <p>Company: {data.customer_company}</p>
          <p>Street: {data.customer_street}</p>
          <p>City: {data.customer_city}</p>
          <p>State: {data.customer_state}</p>
          <p>Zip: {data.customer_zip}</p>
          <p>Phone: {data.customer_phone}</p>
          <p>Email: {data.customer_email}</p>
        </div>
      </section>
      <CreateTable data={data.products} />
      <section className="flex flex-col">
        <h2 className="font-bold">CREDIT CARD INFORMATION</h2>
        <div className="flex flex-col">
          <p>Name: {data.name_on_card}</p>
          <p>Card Number: {data.credit_card_number}</p>
          <p>
            Exp: {data.credit_card_expir_day}/{data.credit_card_expir_month}
          </p>
          <p className="self-end text-xl font-bold">Total: {data.total}</p>
        </div>
      </section>
    </main>
  );
}

export default Invoice;
