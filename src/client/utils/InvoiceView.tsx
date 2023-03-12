function InvoiceView() {
  return (
    <p className="text-xs text-blue-500">
      <span className="text-red-500">SELECT</span>
      <br />
      &emsp;(customer.first_name || ' '::text) || customer.last_name{" "}
      <span className="text-red-500">AS</span>
      <br />
      &emsp;customer_name, customer.email{" "}
      <span className="text-red-500">AS</span> customer_email,
      <br />
      &emsp;customer.company <span className="text-red-500">AS</span>{" "}
      customer_company, <br />
      &emsp;customer.street <span className="text-red-500">AS</span>{" "}
      customer_street, <br />
      &emsp;customer.city <span className="text-red-500">AS</span>{" "}
      customer_city, <br />
      &emsp;customer.state <span className="text-red-500">AS</span>{" "}
      customer_state, <br />
      &emsp;customer.zip <span className="text-red-500">
        AS
      </span> customer_zip, <br />
      &emsp;customer.phone <span className="text-red-500">AS</span>{" "}
      customer_phone,
      <br />
      &emsp;(sales_person.first_name || ' '::text) || sales_person.last_name{" "}
      <span className="text-red-500">AS</span> sales_person_name, <br />
      &emsp;sales_order.time_order_taken,
      <br />
      &emsp;sales_order.purchase_order_number, sales_order.name_on_card,
      <br />
      &emsp;sales_order.credit_card_number, sales_order.credit_card_expir_month,
      <br />
      &emsp;sales_order.credit_card_expir_day,
      <br />
      &emsp;json_agg(json_build_object('name', (product.supplier || ' '::text)
      <br />
      &emsp;|| product.name, 'quantity', sales_item.quantity, 'color',
      <br />
      &emsp;item.color, 'size', item.size, 'price', item.price, 'discount',
      <br />
      &emsp;sales_item.discount, 'total', fn_total(item.price,
      <br />
      &emsp;sales_item.discount, sales_item.quantity))){" "}
      <span className="text-red-500">AS</span> products <br />
      <span className="text-red-500">FROM</span> sales_order <br />
      &emsp;<span className="text-red-500">JOIN</span> customer{" "}
      <span className="text-red-500">ON</span> sales_order.customer_id =
      customer.id
      <br />
      &emsp;<span className="text-red-500">JOIN</span> sales_person{" "}
      <span className="text-red-500">ON</span> sales_order.sales_person_id =
      sales_person.id
      <br />
      &emsp;<span className="text-red-500">JOIN</span> sales_item{" "}
      <span className="text-red-500">ON</span> sales_item.sales_order_id =
      sales_order.id <br />
      &emsp;<span className="text-red-500">JOIN</span> item{" "}
      <span className="text-red-500">ON</span> sales_item.item_id = item.id{" "}
      <br />
      &emsp;<span className="text-red-500">JOIN</span> product{" "}
      <span className="text-red-500">ON</span> item.product_id = product.id{" "}
      <br />
      <span className="text-red-500">GROUP BY</span> <br />
      &emsp;((customer.first_name || ' '::text) || customer.last_name), <br />
      &emsp;customer.email, customer.company,
      <br />
      &emsp;customer.street, customer.city, customer.state, customer.zip,
      <br />
      &emsp;customer.phone, <br />
      &emsp;((sales_person.first_name || ' '::text) || sales_person.last_name),{" "}
      <br />
      &emsp;sales_order.time_order_taken,
      <br />
      &emsp;sales_order.purchase_order_number, sales_order.name_on_card,
      <br />
      &emsp;sales_order.credit_card_number, sales_order.credit_card_expir_month,
      <br />
      &emsp;sales_order.credit_card_expir_day <br />
      <span className="text-red-500">ORDER BY</span>{" "}
      sales_order.time_order_taken;
      <br />
    </p>
  );
}

export default InvoiceView;
