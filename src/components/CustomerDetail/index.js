import { useContext, useEffect, useState } from "react";
// @import dependencies
import axios from "axios";
import moment from "moment";
import { AppContext } from "../../context";
import { useParams } from "react-router-dom";
// @import api
import { getCustomerInvoicesApi, updateCustomerApi } from "../../api";
// @import bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
// @import styles
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

export default function CustomerListing() {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [invoiceListing, setInvoiceListing] = useState([]);
  const [orderBy, setOrderBy] = useState({ field: "serial", desc: true });
  const [inputs, setInputs] = useState();
  const [loading, setLoading] = useState();
  const [isSaved, setIsSaved] = useState();
  const [result, setResult] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [show, setShow] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [productListing, setProductListing] = useState([]);
  const { customerList, customerListObject, setCustomerList } =
    useContext(AppContext);
  const { id } = useParams();

  const customer = customerListObject[id];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProductClose = () => setShowProducts(false);
  const handleProductShow = () => setShowProducts(true);

  const getCustomerInvoices = async () => {
    try {
      const res = await axios.get(
        `${getCustomerInvoicesApi}?orderBy=${orderBy.field}&orderDesc=${orderBy.desc}&pageNumber=${pageNumber}&pageSize=${pageSize}&customerId=${customer?.id}`
      );
      if (res.data) {
        setInvoiceListing(res.data.invoices);
        setTotalPageCount(res.data.pagination.totalPages);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setLoading(true);
      const res = await axios.post(updateCustomerApi, {
        customer: {
          ...inputs,
          openingBalanceAmount: inputs.openingBalanceAmount || 0,
          currentBalance: inputs.openingBalanceAmount || 0,
        },
      });
      setResult(res.data.result);
      if (res.data.success === true) {
        setIsSaved(true);
        let index = customerList.findIndex(
          (customerItem) => customerItem.id === customer.id
        );
        customerList[index] = { ...customer, ...inputs };
        setCustomerList([...customerList]);
      } else {
        setIsSaved(false);
      }
      setLoading(false);
    }
  };

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

  useEffect(() => {
    let prodList = [];
    if (invoiceListing?.length > 0) {
      invoiceListing.forEach((invoice, i) => {
        invoice.itemListing?.forEach((item, j) => {
          prodList.push(item);
        });
      });
    }
    setProductListing(prodList);
  }, [invoiceListing]);

  useEffect(() => {
    if (customer) {
      setInputs(customer);
      getCustomerInvoices();
    }
    // eslint-disable-next-line
  }, [customer]);

  /* eslint-disable */

  useEffect(() => {
    if (customer) getCustomerInvoices();
  }, [orderBy, pageNumber, pageSize]);
  /* eslint-enable */

  return (
    <>
      <h1 className={styles.heading}>Customer Details - {customer?.name}</h1>
      {inputs && (
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Customer Name"
                      name="name"
                      onChange={handleChange}
                      value={inputs.name}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      onChange={handleChange}
                      value={inputs.address}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Person"
                      name="contactPerson"
                      onChange={handleChange}
                      value={inputs.contactPerson}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter Phone Number"
                      name="phoneNumber"
                      onChange={handleChange}
                      value={inputs.phoneNumber}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter Mobile Number"
                      name="mobileNumber"
                      onChange={handleChange}
                      value={inputs.mobileNumber}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      onChange={handleChange}
                      value={inputs.email}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fax</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter Fax"
                      name="fax"
                      onChange={handleChange}
                      value={inputs.fax}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Sales Tax Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Sales Tax Number"
                      name="salesTaxNumber"
                      onChange={handleChange}
                      value={inputs.salesTaxNumber}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>NTN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter NTN"
                      name="ntn"
                      onChange={handleChange}
                      value={inputs.ntn}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Opening Balance Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Opening Balance Amount"
                      name="openingBalanceAmount"
                      onChange={handleChange}
                      value={inputs.openingBalanceAmount}
                      disabled={isDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Opening Balance Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter Opening Balance Date"
                      name="openingBalanceDate"
                      onChange={handleChange}
                      value={inputs.openingBalanceDate}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {!isDisabled && (
                  <Button disabled={loading} variant="dark" type="submit">
                    <i className="fa fa-save"></i> {loading ? "Saving" : "Save"}
                  </Button>
                )}
              </Row>
            </Container>
          </Form>
          <Container>
            <Row>
              {isDisabled && (
                <Button
                  variant="dark"
                  onClick={() => {
                    setIsDisabled(false);
                  }}
                >
                  <i className="fa-solid fa-pen"></i> Edit Customer Information
                </Button>
              )}
            </Row>
            <Row>
              <div className={styles.alertWrapper}>
                {isSaved === true && <Alert variant="success">{result}</Alert>}
                {isSaved === false && <Alert variant="danger">{result}</Alert>}
              </div>
            </Row>
          </Container>
        </div>
      )}
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
      {invoiceListing?.length > 0 && (
        <>
          <h1 className={styles.heading}>Invoice Listing</h1>
          <div className={styles.dropdownWrapper}>
            <Button
              variant="secondary"
              onClick={() => {
                handleProductShow();
              }}
            >
              View All Products
            </Button>
            <Dropdown className={styles.pageSizeDropDown}>
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
          <Modal
            show={show}
            onHide={handleClose}
            className={styles.invoiceModal}
          >
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
          <Modal
            show={showProducts}
            onHide={handleProductClose}
            className={styles.invoiceModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>All Products</Modal.Title>
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
                  {productListing?.map((listItem, index) => (
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
              <Button variant="secondary" onClick={handleProductClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
