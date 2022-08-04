import Haeder from "./../components/Haeder"
import Footer from "./../components/Footer"
import Kontaktformular from "../components/Kontaktformular";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Home = () => {
    return (<div>

        <Haeder />
        <Row className='mt-4'>
            <Col xs={1}></Col>
            <Col xs={10}><h2>Kontakt</h2></Col>
            <Col xs={1}></Col>
        </Row>
        <Row>
            <Col xs={1}></Col>
            <Col xs={10}><p>Du hast Fragen? Dann schicke uns hier einfach eine Nachricht:</p></Col>
            <Col xs={1}></Col>
        </Row>
        <Kontaktformular />
        <Footer />
    </div >);
}

export default Home;