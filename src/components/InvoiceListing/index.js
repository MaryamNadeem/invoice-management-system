import React, { useEffect, useState } from "react";
// @import depedecies
import axios from "axios";
import moment from "moment";
// @import api
import { getInvoiceApi } from "../../api";
// @import bootstrap components
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
//@import styles
import styles from "./index.module.scss";

const pageSizeValues = [5, 10, 50, 100];

const orderByValues = [
  { field: "createdAt", desc: true },
  { field: "serial", desc: true },
  { field: "totalWithTax", desc: true },
  { field: "createdAt", desc: false },
  { field: "totalWithTax", desc: false },
  { field: "serial", desc: false },
];

export default function InvoiceListing() {
  // const [loading, setLoading] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [invoiceListing, setInvoiceListing] = useState([]);
  const [orderBy, setOrderBy] = useState({ field: "serial", desc: true });
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getInvoiceListing = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${getInvoiceApi}?orderBy=${orderBy.field}&orderDesc=${orderBy.desc}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      if (res.data) {
        setInvoiceListing(res.data.invoices);
        setTotalPageCount(res.data.pagination.totalPages);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  /* eslint-disable */

  useEffect(() => {
    getInvoiceListing();
  }, [orderBy, pageNumber, pageSize]);
  /* eslint-enable */

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
      <h1 className={styles.heading}>Invoice Listing</h1>
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SR.</th>
              <th>Customer</th>
              <th>Credit Terms</th>
              <th>Total without Tax</th>
              <th>Tax Amount</th>
              <th>Total with Tax</th>
              <th>Created At</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {invoiceListing.map((invoice, i) => (
              <tr key={i}>
                <td>{invoice.serial}</td>
                <td>{invoice.customer.name}</td>
                <td>{invoice.creditTerms}</td>
                <td>{invoice.totalWithoutTax}</td>
                <td>{invoice.taxAmount}</td>
                <td>{invoice.totalWithTax}</td>
                <td>
                  {invoice.createdAt &&
                    moment(invoice.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleShow();
                      console.log("is main", invoice);
                      setInvoiceDetails(invoice);
                    }}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className={styles.paginationWrapper}>
          <Pagination itemclass="page-item" linkClass="page-link">
            {pageButtons}
          </Pagination>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className={styles.invoiceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Sales Tax Percentage</th>
                <th>Total Without Tax</th>
                <th>Tax Amount</th>
                <th>Total With Tax</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails?.itemListing?.map((listItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{listItem?.name}</td>
                  <td>{listItem?.quantity}</td>
                  <td>{listItem?.rate}</td>
                  <td>{listItem?.taxPercentage}%</td>
                  <td>{listItem?.totalWithoutTax}</td>
                  <td>{listItem?.taxAmount}</td>
                  <td>{listItem?.totalWithTax}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
