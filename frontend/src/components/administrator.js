/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function Administrator(props) {
    const { state } = useHistory();
    const email = state['email'];
    const data = [
        {
            'name': 'Naman\'s Database',
            'version': '1.1.4',
            'publisher': 'Arohi',
        },
        {
            'name': 'Naman\'s Database 2',
            'version': '1.2.1',
            'publisher': 'Sajal',
        }
    ]
    const getPendingApprovals = () => {
        axios.get('http://127.0.0.1:5000/get_pending_approvals').then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setDatasets(response.data['data']);
            }
            else {
                console.log(response.statusText);
            }
        })
    }
    const [datasets, setDatasets] = useState([]);
    useEffect(() => {
        getPendingApprovals();
    }, []);
    const setStatus = (item, status) => {
        console.log(item, status);
        const dataToSend = {
            name: item['name'],
            version: item['version'],
            publishedBy: item['published_by']
        }
        if (status === 2) {
            axios.post('http://127.0.0.1:5000/send_approval_from_administrator', dataToSend).then(response => {
                console.log(response);
                if (response.data['success'] === 1) {
                    getPendingApprovals();
                }
            });

        }
        else {
            axios.post('http://127.0.0.1:5000/send_reject_from_administrator', dataToSend).then(response => {
                console.log(response);
                if (response.data['success'] === 1) {
                    getPendingApprovals();
                }
            });
        }
    }
    // const { email } = props.location;
    return (
        <div style={{
            background: "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
            margin: 'auto',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'

        }} className="container-fluid text-center">
            <div >
                <h2 className="pt-5 pb-3">Approvals Pending</h2>
                <Table striped bordered hover responsive size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>Database Name</th>
                            <th>Version</th>
                            <th>Published By</th>
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
                                        <td>{item['published_by']}</td>
                                        <td><Button variant="success" onClick={() => setStatus(item, 2)}>Approve</Button></td>
                                        <td><Button variant="danger" onClick={() => setStatus(item, 0)}>Reject</Button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}