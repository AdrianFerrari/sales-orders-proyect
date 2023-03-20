import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const location = useLocation();

  function activeLink(path: string) {
    if (location.pathname === path) return "underline";
    return "";
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-4 flex flex-col gap-2 overflow-x-auto">
        <header className="flex gap-2 justify-evenly">
          <Link className={activeLink("/")} to="/">
            Invoices
          </Link>
          <Link className={activeLink("/sales_orders")} to="/sales_orders">
            Sales Orders
          </Link>
          <Link className={activeLink("/customers")} to="/customers">
            Customers
          </Link>
          <Link className={activeLink("/items")} to="/items">
            Items
          </Link>
          <Link className={activeLink("/products")} to="/products">
            Products
          </Link>
          <Link className={activeLink("/products_types")} to="/product_types">
            Product types
          </Link>
          <Link className={activeLink("/sales_items")} to="/sales_items">
            Sales items
          </Link>
          <Link className={activeLink("/sales_people")} to="/sales_people">
            Sales people
          </Link>
        </header>
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}

export default App;
