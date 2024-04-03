const isLocal = process.env.REACT_APP_FIREBASE_ENV === "local";

export const saveCustomerApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/saveCustomer"
  : "https://savecustomer-mfhawj3fca-uc.a.run.app";
export const getCustomerApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/getCustomers"
  : "https://getcustomers-mfhawj3fca-uc.a.run.app/";
export const saveInvoiceApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/saveInvoice"
  : "https://saveinvoice-mfhawj3fca-uc.a.run.app";
export const getInvoicesApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/getInvoices"
  : "https://getinvoices-mfhawj3fca-uc.a.run.app";
export const getCustomerInvoicesApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/getCustomerInvoices"
  : "https://getcustomerinvoices-mfhawj3fca-uc.a.run.app";
export const updateCustomerApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/updateCustomer"
  : "https://updatecustomer-mfhawj3fca-uc.a.run.app";
export const getInvoiceApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/getInvoice"
  : "https://getinvoice-mfhawj3fca-uc.a.run.app";
export const updateInvoiceApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/updateInvoice"
  : "https://updateinvoice-mfhawj3fca-uc.a.run.app";
