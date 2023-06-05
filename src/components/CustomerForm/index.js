import { useState } from "react";
// @import depedecies
import axios from "axios";
import { format } from "date-fns";
// @import api
import { saveCustomerApi } from "../../api";
// @import bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// @import styles
import styles from "./index.module.scss";

export default function CustomerForm() {
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    contactPerson: "",
    phoneNumber: "",
    mobileNumber: "",
    email: "",
    fax: "",
    salesTaxNumber: "",
    ntn: "",
    openingBalanceAmount: "",
    openingBalanceDate: "",
    currentBalance: "",
    date: format(new Date(), "dd-MMM-yyyy kk:mm:ss"),
  });
  const [isSaved, setIsSaved] = useState();
  const [result, setResult] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(saveCustomerApi, {
      customer: inputs,
    });
    setResult(res.data.result);
    if (res.data.success === true) {
      setIsSaved(true);
      setInputs({
        name: "",
        address: "",
        contactPerson: "",
        phoneNumber: "",
        mobileNumber: "",
        email: "",
        fax: "",
        salesTaxNumber: "",
        ntn: "",
        openingBalanceAmount: "",
        openingBalanceDate: "",
        currentBalance: "",
      });
    } else {
      setIsSaved(false);
    }
  };

  return (
    <>
      <h1 className={styles.heading}>New Customer</h1>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Add new customer information</h3>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Customer Name"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name}
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={inputs.phoneNumber}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="mobileNumber"
                    onChange={handleChange}
                    value={inputs.mobileNumber}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                    value={inputs.email}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fax</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Fax"
                    name="fax"
                    onChange={handleChange}
                    value={inputs.fax}
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Opening Balance Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Opening Balance Amount"
                    name="openingBalanceAmount"
                    onChange={handleChange}
                    value={inputs.openingBalanceAmount}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Opening Balance Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Opening Balance Date"
                    name="openingBalanceDate"
                    onChange={handleChange}
                    value={inputs.openingBalanceDate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Current Balance</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Current Balance"
                    name="currentBalance"
                    onChange={handleChange}
                    value={inputs.currentBalance}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
        <Container>
          <Row>
            <Button variant="dark" type="submit" onClick={handleSubmit}>
              <i className="fa fa-save"></i> Save
            </Button>
          </Row>
          <Row>
            <div className={styles.alertWrapper}>
              {isSaved === true && <Alert variant="success">{result}</Alert>}
              {isSaved === false && <Alert variant="danger">{result}</Alert>}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
