import { useEffect, useState } from "react";
// @import depedecies
import axios from "axios";
// @import api
import { getCustomerApi } from "../../api";
// @import bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
// @import styles
import styles from "./index.module.scss";

function InvoiceForm() {
  const [loading, setLoading] = useState(false);
  const [customerListing, setCustomerListing] = useState([]);
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

  const getCustomerListing = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${getCustomerApi}?orderBy=name&orderDesc=false`
      );
      if (res.data) {
        setCustomerListing(res.data.customers);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerListing();
  }, []);

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

  const handleSubmit = async (event) => {
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

  return (
    <>
      <h1 className={styles.heading}>Sales Invoice</h1>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Customer Information</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Customer</Form.Label>
            <Form.Select>
              <option selected disabled>
                Select Customer
              </option>
              {customerListing.map((item, i) => (
                <option>
                  {item.name} - {item.id}
                </option>
              ))}
            </Form.Select>
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
              </tr>
            </thead>
            <tbody>
              {itemListing.map((listItem, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{listItem.name}</td>
                  <td>{listItem.quantity}</td>
                  <td>{listItem.rate}</td>
                  <td>{listItem.taxPercentage}%</td>
                  <td>{listItem.totalWithoutTax}</td>
                  <td>{listItem.taxAmount}</td>
                  <td>{listItem.totalWithTax}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <h6>Total without Sales Tax: {totalWithoutTax}</h6>
          <h6>Tax Amount: {taxAmount}</h6>
          <h6>Total with Sales Tax: {totalWithTax}</h6>
          <Button variant="dark">
            <i className="fa fa-save"></i> Save
          </Button>
          &nbsp;
          <Button variant="dark">
            <i className="fa fa-print"></i> Print
          </Button>
        </div>
      </div>
    </>
  );
}

export default InvoiceForm;
