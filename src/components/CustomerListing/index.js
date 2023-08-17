import { useEffect, useState } from "react";
// @import depedecies
import axios from "axios";
// @import api
import { getCustomerApi } from "../../api";
// @import bootstrap components
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
// @import styles
import styles from "./index.module.scss";

const orderByValues = [
  { field: "name", desc: true },
  { field: "createdAt", desc: true },
  { field: "currentBalance", desc: true },
  { field: "name", desc: false },
  { field: "createdAt", desc: false },
  { field: "currentBalance", desc: false },
];

const pageSizeValues = [5, 10, 50, 100];

export default function CustomerListing() {
  const [customerListing, setCustomerListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState({ field: "createdAt", desc: true });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPageCount, setTotalPageCount] = useState(0);

  let pageButtons = [];
  for (let number = 1; number <= totalPageCount; number++) {
    pageButtons.push(
      <Pagination.Item
        key={number}
        onClick={() => setPageNumber(number)}
        active={number === pageNumber}
      >
        {number}
      </Pagination.Item>
    );
  }

  const getCustomerListing = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${getCustomerApi}?orderBy=${orderBy.field}&orderDesc=${orderBy.desc}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      if (res.data) {
        setCustomerListing(res.data.customers);
        setTotalPageCount(res.data.pagination.totalPages);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerListing();
  }, [orderBy, pageNumber, pageSize]);

  return (
    <>
      <style type="text/css">
        {`
        .active .page-link{
        background-color: #6c757d;
        color: white;
        border:1px solid #6c757d;
        }
        .page-link{
            color:#6c757d;
        }

    `}
      </style>
      <h1 className={styles.heading}>Customer Listing</h1>
      <div className={styles.dropdownWrapper}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Order By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {orderByValues.map((item) => (
              <Dropdown.Item
                style={{ textTransform: "capitalize" }}
                className={`${
                  item.desc === orderBy.desc && item.field === orderBy.field
                    ? "bg-secondary text-light"
                    : ""
                }`}
                onClick={() => setOrderBy(item)}
                key={`${item.field}-${item.desc}`}
              >
                {item.field} {item.desc ? "(DESC)" : "(ASC)"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className={styles.pageSizeDropDown}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Page Size
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {pageSizeValues.map((item) => (
              <Dropdown.Item
                style={{ textTransform: "capitalize" }}
                className={`${
                  item === pageSize ? "bg-secondary text-light" : ""
                }`}
                onClick={() => setPageSize(item)}
                key={`pagesize-${item}`}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.tableContainer}>
        <Table
          striped
          bordered
          hover
          responsive
          className="table-responsive text-nowrap"
        >
          <thead>
            <tr>
              <th>sr#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Person</th>
              <th>Phone Number</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Fax</th>
              <th>Sales Tax Number</th>
              <th>NTN</th>
              <th>Opening Balance Amount</th>
              <th>Opening Balance Date</th>
              <th>Current Balance</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {customerListing.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.contactPerson}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.email}</td>
                <td>{item.fax}</td>
                <td>{item.salesTaxNumber}</td>
                <td>{item.ntn}</td>
                <td>{item.openingBalanceAmount}</td>
                <td>{item.openingBalanceDate}</td>
                <td>{item.currentBalance}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className={styles.paginationWrapper}>
          <Pagination linkClass="page-link">{pageButtons}</Pagination>
        </div>
      </div>
    </>
  );
}
