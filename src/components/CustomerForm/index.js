// @import bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// @import styles
import styles from "./index.module.scss";

export default function CustomerForm() {
  return (
    <>
      <h1 className={styles.heading}>New Customer</h1>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Add new customer information</h3>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fax</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sales Tax Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>NTN</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Opening Balance Amount</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Opening Balance Date</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Current Balance</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
        <Button variant="dark">
          <i className="fa fa-save"></i> Save
        </Button>
      </div>
    </>
  );
}
