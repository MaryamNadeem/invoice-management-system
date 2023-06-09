// @import modules
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @import components
import InvoiceForm from "./components/InvoiceForm";
import CustomerForm from "./components/CustomerForm";
import InvoiceListing from "./components/InvoiceListing";
import CustomerListing from "./components/CustomerListing";
// @import modules
import Navbar from "./modules/Navbar";

const routes = [
  {
    path: "/",
    component: <InvoiceListing />,
  },
  {
    path: "/new-invoice",
    component: <InvoiceForm />,
  },
  {
    path: "/new-customer",
    component: <CustomerForm />,
  },
  {
    path: "/customer-listing",
    component: <CustomerListing />,
  },
];

function App() {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} element={component} key={key} />
  ));

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
