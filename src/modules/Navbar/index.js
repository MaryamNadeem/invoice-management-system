import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Umer Enterprise</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/new-invoice">
              Add New Invoice
            </Nav.Link>
            <Nav.Link as={Link} to="/new-customer">
              Add New Customer
            </Nav.Link>
            <Nav.Link as={Link} to="/customer-listing">
              Customer Listing
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Item Listing
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
