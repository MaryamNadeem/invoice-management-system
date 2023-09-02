// @import modules
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @import components
import InvoiceForm from "./components/InvoiceForm";
import CustomerForm from "./components/CustomerForm";
import InvoiceListing from "./components/InvoiceListing";
import CustomerDetail from "./components/CustomerDetail";
import CustomerListing from "./components/CustomerListing";
// @import modules
import Navbar from "./modules/Navbar";
import { AppContextProvider } from "./context";
// @import css
import "react-select-search/style.css";
import "./styles/global.scss";

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
  {
    path: "/customer-detail/:id",
    component: <CustomerDetail />,
  },
];

function App() {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} element={component} key={key} />
  ));

  return (
    <div>
      <AppContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>{routeComponents}</Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
