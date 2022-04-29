/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, FloatingLabel } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from "axios";
export default function Login() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            }
            axios.post('http://127.0.0.1:5000/login', values).then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    if (response.data['success'] == 1) {
                        const type = response.data['type'];
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
                        alert("Please Input correct email and password");
                    }
                }
                else {
                    console.log(response.statusText);
                }
            })
        }
    }


    // JSX code for login form
    const renderForm = (
        <Form onSubmit={handleSubmit} validated={validated} className="d-flex flex-column justify-content-center text-center items-center">
            <FloatingLabel className="mb-3" controlId="formBasicEmail" label="Email Address">
                <Form.Control type="email" placeholder="Please Enter Your Email Address" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="formBasicPassword" label="Password">
                <Form.Control type="password" placeholder="Please Enter Your Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </FloatingLabel>
            <Form.Text className="mb-2 text-black">Not registered? <Link to="/signup">Click here</Link> to signup.</Form.Text>
            <br />
            <Button variant="primary" type="submit" className="">
                Login
            </Button>
        </Form>

    );

    return (
        <div style={{
            background: "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
            // backgroundImage: "linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)",
            margin: 'auto',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'

        }} className="container-fluid text-center">
            <div style={{
                width: '50%',
                justifyContent: 'center',
                margin: 'auto'
            }}>
                <h2 className="pb-3 pt-5" style={{
                    width: '20%',
                    justifyContent: 'center',
                    margin: 'auto'
                }}>Login</h2>
                <div className="">
                    {renderForm}
                </div>
            </div>
        </div>
    );
}