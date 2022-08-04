import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Haeder = () => {
    return (<div>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="">TestCode</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="">Home</Nav.Link>
                    <Nav.Link href="">About</Nav.Link>
                    <Nav.Link href="">Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>);
}

export default Haeder;