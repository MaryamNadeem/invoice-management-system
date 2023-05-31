import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Umer Enterprise</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/new-invoice">Add New Invoice</Nav.Link>
            <Nav.Link href="/new-customer">Add New Customer</Nav.Link>
            <Nav.Link href="/customer-listing">Customer Listing</Nav.Link>
            <Nav.Link href="/">Item Listing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
