/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, FloatingLabel, Form, FormLabel, Table } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Publisher(props) {
    const { state } = useHistory();
    const email = state['email'];
    const [validated, setValidated] = useState(false);
    const [dbName, setDbName] = useState("");
    const [datasets, setDatasets] = useState([]);
    const [version, setVersion] = useState("");
    const [zipFile, setZipFile] = useState(null);
    const [isApproval, setIsApproval] = useState(true);
    const setStatus = (item, status) => {
        console.log(item, status);
        const dataToSend = {
            name: item['name'],
            version: item['version'],
            requestedBy: item['requested_by']
        }
        if (status === 2) {
            axios.post('http://127.0.0.1:5000/send_approval_from_publisher', dataToSend).then(response => {
                console.log(response);
                if (response.data['success'] === 1) {
                    getDownloadRequests();
                }
            });

        }
        else {
            axios.post('http://127.0.0.1:5000/send_reject_from_publisher', dataToSend).then(response => {
                console.log(response);
                if (response.data['success'] === 1) {
                    getDownloadRequests();
                }
            });
        }
    }
    const getDownloadRequests = () => {
        const values = {
            user: email,
        }
        axios.post('http://127.0.0.1:5000/get_download_requests_for_publisher', values).then(response => {
            if (response.status === 200) {
                console.log(response);
                setDatasets(response.data['datasets']);
            }
            else {
                console.log(response.statusText);
            }
        });
    }
    useEffect(() => {
        getDownloadRequests();
    }, []);
    const [publishRequested, setPublish] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        const form = event.currentTarget;
        console.log(dbName, version, zipFile, isApproval, email);
        if (form.checkValidity() === false) {
            event.stopPropogation();
        }
        else {
            setValidated(true);
            const values = {
                name: dbName,
                version: version,
                file: zipFile,
                isApproval: isApproval,
                publishedBy: email
            }
            axios.post('http://127.0.0.1:5000/upload_request_from_approval', values).then(response => {
                console.log(response);
                if (response.data['success'] === 1) {
                    alert('Dataset successfully uploaded');
                }
            });
        }
    }

    const renderPublishForm = (
        <Form onSubmit={handleSubmit} validated={validated} className="d-flex flex-column justify-content-center text-center items-center">
            <FloatingLabel label="Database Name" controlId="formBasicText" className="mb-3">
                <Form.Control type="text" placeholder="Please Enter Database Name" value={dbName} onChange={(e) => setDbName(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel label="Version" controlId="formBasicText" className="mb-3">
                <Form.Control type="text" placeholder="Please Enter Database Version" value={version} onChange={(e) => setVersion(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel label="Database Zip File" controlId="formFile" className="mb-3">
                <Form.Control type="file" className="mt-2" accept=".zip" value={zipFile} onChange={(e) => setZipFile(e.target.value)} />
            </FloatingLabel>
            <Form.Group className="mb-3 d-flex flex-row align-center" controlId="formSwitch">
                <Form.Label>Requires Approval For Download</Form.Label>
                <Form.Check type="switch" className="px-5 mx-5" lable="Is Approval Required" value={isApproval} onChange={(e) => setIsApproval(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="">
                Publish
            </Button>
        </Form>
    )
    return (
        <div style={{
            background: "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
            margin: 'auto',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'

        }} className="container-fluid text-center">
            {publishRequested === false ?
                (<div><div style={{
                    "height": '70vh'
                }}>
                    <h2 className="pt-5 pb-3">Download Requests</h2>
                    <Table striped bordered hover responsive size="sm" className="text-center">
                        <thead>
                            <tr>
                                <th>Database Name</th>
                                <th>Version</th>
                                <th>Requested By</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datasets.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item['name']}</td>
                                            <td>{item['version']}</td>
                                            <td>{item['requested_by']}</td>
                                            <td><Button variant="success" onClick={() => setStatus(item, 2)}>Accept</Button></td>
                                            <td><Button variant="danger" onClick={() => setStatus(item, 0)}>Decline</Button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                    <div >
                        <Button variant="primary" onClick={() => {
                            setPublish(true);
                        }}>Publish a Dataset</Button>
                    </div>
                </div>) :
                (<div style={{
                    width: '50%',
                    justifyContent: 'center',
                    margin: 'auto',
                    padding: '4rem'
                }}>
                    <h2 className="pt-5 pb-3">Database To Publish</h2>
                    {renderPublishForm}
                </div>)
            }
        </div >
    )
}
