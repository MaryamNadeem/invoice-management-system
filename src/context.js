import { createContext, useEffect, useState } from "react";
import { getCustomerApi } from "./api";
import axios from "axios";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState([]);
  const [customerListObject, setCustomerListObject] = useState({});

  useEffect(() => {
    getCustomerListing();
  }, []);

  useEffect(() => {
    const obj = {};
    if (customerList && customerList.length) {
      customerList.forEach((value) => {
        obj[value.id] = { ...value };
      });
    }
    setCustomerListObject({ ...obj });
  }, [customerList]);

  const getCustomerListing = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${getCustomerApi}?orderBy=name&orderDesc=false`
      );
      if (res.data) {
        setCustomerList(res.data.customers);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ customerList, setCustomerList, customerListObject }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
