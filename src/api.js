const isLocal = process.env.REACT_APP_FIREBASE_ENV === "local";

export const saveCustomerApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/saveCustomer"
  : "https://savecustomer-mfhawj3fca-uc.a.run.app";
export const getCustomerApi = isLocal
  ? "http://127.0.0.1:5001/pitc-16c89/us-central1/getCustomers"
  : "https://getcustomers-mfhawj3fca-uc.a.run.app/";
