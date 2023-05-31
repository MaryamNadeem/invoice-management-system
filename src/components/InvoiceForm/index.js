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
  return (
    <>
      <h1 className={styles.heading}>Sales Invoice</h1>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Customer Information</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Customer</Form.Label>
            <Form.Select>
              <option>Customer</option>
              <option>Customer</option>
              <option>Customer</option>
              <option>Customer</option>
              <option>Customer</option>
              <option>Customer</option>
              <option>Customer</option>
              <option>Customer</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Credit Terms</Form.Label>
            <Form.Control type="text" placeholder="Enter Credit Terms" />
          </Form.Group>
        </Form>
      </div>
      <div className={styles.formContainer}>
        <h3 className={styles.innerHeading}>Add Items</h3>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Item</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Rate</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Total without Sales Tax</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sales Tax Percenatage</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tax Amount</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Total with Sales Tax</Form.Label>
                  <Form.Control type="text" placeholder="Enter Item Name" />
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
                <th>Quantity</th>
                <th>Description</th>
                <th>Price</th>
                <th>Total</th>
                <th>Sales Tax</th>
                <th>Value with Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <h6>Total without Sales Tax</h6>
          <h6>Tax Amount</h6>
          <h6>Total with Sales Tax</h6>
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
