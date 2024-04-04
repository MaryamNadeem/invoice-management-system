import { useContext, useEffect, useState } from "react";
// @import depedecies
import axios from "axios";
import { useParams } from "react-router-dom";
import SelectSearch from "react-select-search";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../modules/InvoicePDF";
// @import api
import { updateInvoiceApi, getInvoiceApi } from "../../api";
// @import bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// @import styles
import styles from "./index.module.scss";
import { AppContext } from "../../context";

function InvoiceDetail() {
  const [loading, setLoading] = useState(false);
  const [itemListing, setItemListing] = useState([]);
  const [item, setItem] = useState({
    name: "",
    quantity: 0,
    rate: 0,
    taxPercentage: 0,
    taxAmount: 0,
    totalWithTax: 0,
    totalWithoutTax: 0,
  });
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [creditTerms, setCreditTerms] = useState("");
  const [customer, setCustomer] = useState({ id: "" });
  const [isSaved, setIsSaved] = useState();
  const [invoice, setInvoice] = useState(null);
  const { id } = useParams();

  const { customerList, customerListObject } = useContext(AppContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let quantity, rate, taxPercentage;
    name === "quantity" && value
      ? (quantity = parseInt(value))
      : (quantity = item.quantity);
    name === "rate" && value ? (rate = parseInt(value)) : (rate = item.rate);
    name === "taxPercentage" && value
      ? (taxPercentage = parseInt(value))
      : (taxPercentage = item.taxPercentage);
    let taxAmount = quantity * rate * (taxPercentage / 100);

    setItem((item) => ({
      ...item,
      [name]: value,
      taxAmount: taxAmount,
      totalWithTax: quantity * rate + taxAmount,
      totalWithoutTax: quantity * rate,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setItem({
      name: "",
      quantity: 0,
      rate: 0,
      taxPercentage: 0,
      taxAmount: 0,
      totalWithTax: 0,
      totalWithoutTax: 0,
    });
    setItemListing((itemListing) => [...itemListing, item]);
  };

  const saveInvoice = async () => {
    if (!customer || !customer.id) {
      alert("Please select Customer");
      return;
    } else if (!invoice || !invoice.id) {
      alert("Invoice not present");
      return;
    }
    let invoiceObj = {
      customer: {
        id: customer.id,
        name: customer.name,
        serial: customer.serial,
      },
      creditTerms: creditTerms,
      itemListing: itemListing,
      totalWithoutTax: totalWithoutTax,
      taxAmount: taxAmount,
      totalWithTax: totalWithTax,
      id: invoice.id,
      serial: invoice.serial,
    };
    setLoading(true);
    const res = await axios.post(updateInvoiceApi, { invoice: invoiceObj });
    if (res.data.success === true) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    let preTax = 0,
      tax = 0,
      postTax = 0;
    for (let i = 0; i < itemListing.length; i++) {
      preTax += itemListing[i].totalWithoutTax;
      tax += itemListing[i].taxAmount;
      postTax += itemListing[i].totalWithTax;
    }
    setTotalWithoutTax(preTax);
    setTaxAmount(tax);
    setTotalWithTax(postTax);
  }, [itemListing]);

  const getInvoice = async () => {
    try {
      const res = await axios.get(`${getInvoiceApi}?invoiceId=${id}`);
      if (res.data) {
        setItemListing(res.data.invoice?.itemListing);
        setCustomer({
          id: res.data.invoice?.customer?.id,
          name: res.data.invoice?.customer?.name,
          serial: res.data.invoice?.customer?.serial,
        });
        setCreditTerms(res.data.invoice?.creditTerms);
        setTaxAmount(res.data.invoice?.taxAmount);
        setTotalWithTax(res.data.invoice?.setTotalWithTax);
        setTotalWithoutTax(res.data.invoice?.setTotalWithTax);
        setInvoice(res.data.invoice);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (id) {
      getInvoice();
    }
    // eslint-disable-next-line
  }, []);

  const deleteItem = (indexToDelete) => {
    setItemListing((prevItems) =>
      prevItems.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <>
      <h1 className={styles.heading}>Sales Invoice</h1>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Customer Information</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Customer</Form.Label>
            <SelectSearch
              className="select-search"
              options={customerList.map((item) => {
                return { ...item, value: item.id };
              })}
              value={customer.id}
              search
              closeOnSelect
              onChange={(value) => {
                if (value) {
                  const customer = customerListObject[value];
                  setCustomer({ ...customer });
                } else {
                  setCustomer({ id: "" });
                }
              }}
              placeholder="Search Customer"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Credit Terms</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Credit Terms"
              name="creditTerms"
              value={creditTerms}
              onChange={(e) => {
                setCreditTerms(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </div>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Add Items</h3>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    name="name"
                    onChange={handleChange}
                    value={item.name}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Item Quantity"
                    name="quantity"
                    onChange={handleChange}
                    value={item.quantity}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="numer"
                    placeholder="Enter Item Rate"
                    name="rate"
                    onChange={handleChange}
                    value={item.rate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Total without Sales Tax</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Total without Sales Tax"
                    name="totalWithoutTax"
                    value={item.totalWithoutTax}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sales Tax Percenatage</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Sales Tax Percentage"
                    name="taxPercentage"
                    value={item.taxPercentage}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tax Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Tax Amount"
                    value={item.taxAmount}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Total with Sales Tax</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Total With Sales Tax"
                    value={item.totalWithTax}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="dark" type="submit">
                  Add Item
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
        <div className={styles.tableContainer}>
          <Table striped bordered hover>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemListing.map((listItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{listItem.name}</td>
                  <td>{listItem.quantity}</td>
                  <td>{listItem.rate}</td>
                  <td>{listItem.taxPercentage}%</td>
                  <td>{listItem.totalWithoutTax}</td>
                  <td>{listItem.taxAmount}</td>
                  <td>{listItem.totalWithTax}</td>
                  <td>
                    <Button
                      disabled={loading}
                      variant="dark"
                      onClick={() => {
                        deleteItem(index);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <h6>Total without Sales Tax: {totalWithoutTax}</h6>
          <h6>Tax Amount: {taxAmount}</h6>
          <h6>Total with Sales Tax: {totalWithTax}</h6>
          <Button disabled={loading} variant="dark" onClick={saveInvoice}>
            <i className="fa fa-save"></i> {loading ? "Updating" : "Update"}
          </Button>
          &nbsp;
          <PDFDownloadLink
            document={
              <InvoicePDF
                customerName={customer.name}
                creditTerms={creditTerms}
                totalWithoutTax={totalWithoutTax}
                totalWithTax={totalWithTax}
                taxAmount={taxAmount}
                itemListing={itemListing}
              />
            }
            fileName={"invoice.pdf"}
          >
            <Button variant="dark">
              <i className="fa fa-print"></i> Print
            </Button>
          </PDFDownloadLink>
        </div>
        <Container>
          <Row>
            <div className={styles.alertWrapper}>
              {isSaved === true && (
                <Alert variant="success">Invoice Updated Successfully</Alert>
              )}
              {isSaved === false && (
                <Alert variant="danger">
                  There was an error in saving the Invoice, please try again
                </Alert>
              )}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default InvoiceDetail;
