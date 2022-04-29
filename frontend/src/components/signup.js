import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("1");
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
            event.stopPropogation();
        }
        else {
            setValidated(true);
            const values = {
                email: email,
                password: password,
                type: type
            }
            axios.post('http://127.0.0.1:5000/register', values).then(response => {
                console.log(response);
                if (response.status === 200) {
                    if (response.data['success'] === 1) {
                        if (type === '1') {
                            history('/administrator', { state: { email: email } });
                        }
                        else if (type === '2') {
                            history('/publisher', { state: { email: email } });
                        }
                        else if (type === '3') {
                            history('/consumer', { state: { email: email } });
                        }
                    }
                    else {
                        if (response.data['message'] === 1) {
                            alert("User with given email already exists");
                        }
                    }
                }
                else {
                    console.log(response.statusText);
                }
            })
        }

    }

    const renderForm = (
        <Form onSubmit={handleSubmit} validated={validated} className="d-flex flex-column align-items-center">
            <FloatingLabel className="w-100 mb-3 d-flex flex-column align-items-center" controlId="formBasicEmail" label="Email Address">
                <Form.Control type="email" placeholder="Please Enter Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel className="w-100 mb-3 d-flex flex-column align-items-center" controlId="formBasicPassword" label="Password">
                <Form.Control type="password" placeholder="Please Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel className="w-100 mb-3 d-flex flex-column align-items-center" controlId="formBasicSelect" label="User Type">
                <Form.Select aria-label="User Type" className="mb-3" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="1">Administrator</option>
                    <option value="2">Publisher</option>
                    <option value="3">Consumer</option>
                </Form.Select>
            </FloatingLabel>
            <Form.Text className="mb-2 text-black">Already registered? <Link to="/login">Click here</Link> to login.</Form.Text>
            <br />
            <Button variant="primary" type="submit" className="w-50 text-center d-flex flex-column align-items-center">
                SignUp
            </Button>
        </Form >

    );

    return (

        <div style={{
            background: "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
            paddingTop: '7rem',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'
        }} className="container-fluid">
            <div style={{
                width: '50%',
                justifyContent: 'center',
                margin: 'auto'

            }} className="d-flex flex-column align-items-center">
                <h2 className="pb-3 pt-5" style={{
                    width: '20%',
                    justifyContent: 'center',
                    margin: 'auto',
                    height: '20%'
                }}>SignUp</h2>
                <div className="w-75 d-flex flex-column align-items-center">
                    {renderForm}
                </div>
            </div>
        </div>
    );
}