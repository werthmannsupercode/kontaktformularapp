import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { apiBaseUrl } from "./../api"


const Kontaktformular = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [show, setShow] = useState(false)
    const [checkbox, setCheckbox] = useState(false)

    // function handleErrors(response) {
    //     if (!response.ok) {
    //         return alert("Bitte überprüfe deine Eingabe, deine Nachricht konnte nicht übermittelt werden.")
    //     }
    //     else {
    //         return setShow(true), setName(""), setText(""), setEmail(""), setCheckbox(false);
    //     }
    // }

    const sendNewRequest = (e) => {
        e.preventDefault();
        if (name.length === 0) {
            alert("Wir möchten dich gerne persönlich ansprechen. Gib bitte noch deinen Namen ein")
            return
        }
        if (email.indexOf("@") === -1 || email.length === 0) {
            alert("Bitte überprüfe deine Emailadresse.")
            return
        }
        if (text.length === 0) {
            alert("Bitte gib eine Nachricht ein.")
            return
        }
        if (checkbox === false) {
            alert("Bitte stimme unserer DSGVO zu")
            return
        }
        else {
            fetch(apiBaseUrl + "/kontaktanfragen/neueanfrage", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    text
                })
            }).then(res => res.json(), setShow(true), setName(""), setText(""), setEmail(""), setCheckbox(false))
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (<div>
        <Row className='mt-3'>
            <Col xs={2}></Col>
            <Col xs={8}>< Form >
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Dein Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Deine Emailaddresse</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Deine Nachricht an uns</Form.Label>
                    <Form.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Ich akzeptiere die DSGVO" onChange={() => setCheckbox(!checkbox)} checked={checkbox} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendNewRequest}>
                    Absenden
                </Button>
            </Form ></Col>
            <Col xs={2}></Col>
        </Row>
        <Alert show={show} variant="success" className='m-5 w-50 position-absolute top-50 start-50 translate-middle'>
            <Alert.Heading>Danke für deine Anfrage!</Alert.Heading>
            <p>{`Wir haben soeben deine Anfrage erhalten und dir eine Bestätigungsmail geschickt.`}</p>
            <p>Wir melden uns ganz bald bei Dir.</p>
            <p>Bis dahin eine schöne Zeit!</p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    Schließen
                </Button>
            </div>
        </Alert>
    </div>);
}

export default Kontaktformular;