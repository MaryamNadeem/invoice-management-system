import { useState, useContext } from "react";
// @import context
import { AppContext } from "../../context";
// @import bootstrap components
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
// @import styles
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Button } from "react-bootstrap";

const orderByValues = [
  { field: "serial", desc: true },
  { field: "name", desc: true },
  { field: "createdAt", desc: true },
  { field: "name", desc: false },
  { field: "createdAt", desc: false },
  { field: "serial", desc: false },
];

const pageSizeValues = [5, 10, 50, 100];

export default function CustomerListing() {
  const { customerList } = useContext(AppContext);
  // const [loading, setLoading] = useState(false);s
  const [orderBy, setOrderBy] = useState({ field: "serial", desc: true });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const totalPageCount = Math.ceil(customerList?.length / pageSize) || 0;

  const paginateData = () => {
    let list = customerList || [];

    if (orderBy?.field) {
      if (orderBy.desc) {
        list = list.sort((a, b) => {
          let valueA;
          let valueB;
          try {
            valueA = a[orderBy.field]?.toLowerCase() || "";
            valueB = b[orderBy.field]?.toLowerCase() || "";
          } catch (e) {
            valueA = a[orderBy.field];
            valueB = b[orderBy.field];
          }
          if (valueA > valueB) {
            return -1;
          }
          return 1;
        });
      } else {
        list = list.sort((a, b) => {
          let valueA;
          let valueB;
          try {
            valueA = a[orderBy.field]?.toLowerCase() || "";
            valueB = b[orderBy.field]?.toLowerCase() || "";
          } catch (e) {
            valueA = a[orderBy.field];
            valueB = b[orderBy.field];
          }
          if (valueB > valueA) {
            return -1;
          }
          return 1;
        });
      }
    }

    if (pageSize && pageNumber) {
      list = list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    return list;
  };

  const customerListing = paginateData();

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

              <th>Current Balance</th>
              <th>Created At</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {customerListing.map((item, i) => (
              <tr key={i}>
                <td>{item.serial}</td>
                <td>{item.name}</td>

                <td>{item.currentBalance}</td>
                <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>
                  <Button
                    variant="secondary"
                    as={Link}
                    to={`/customer-detail/${item.id}`}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className={styles.paginationWrapper}>
          <Pagination linkclass="page-link">{pageButtons}</Pagination>
        </div>
      </div>
    </>
  );
}
