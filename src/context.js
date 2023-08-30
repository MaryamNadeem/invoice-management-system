import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { getCustomerApi } from "./api";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState([]);
  const [customerListObject, setCustomerListObject] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("customerData");
    let fetchLatest = false;
    if (data) {
      const parsedData = JSON.parse(data);
      const expireTime = parsedData.expiresAt;
      const currTime = moment();
      if (currTime.isAfter(expireTime)) {
        fetchLatest = true;
      } else {
        const list = parsedData.customerList;
        if (!list) {
          fetchLatest = true;
        } else {
          setCustomerList([...list]);
        }
      }
    } else {
      fetchLatest = true;
    }

    if (fetchLatest) {
      getCustomerListing();
    }
  }, []);

  useEffect(() => {
    const obj = {};
    if (customerList && customerList.length) {
      customerList.forEach((value) => {
        obj[value.id] = { ...value };
      });

      const expiresAt = moment().add(10, "m");
      const cacheData = { customerList, expiresAt };
      localStorage.setItem("customerData", JSON.stringify(cacheData));
    }
    setCustomerListObject({ ...obj });
  }, [customerList]);

  const getCustomerListing = async (test) => {
    try {
      // setLoading(true);
      const res = await axios.get(`${getCustomerApi}`);
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
