/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function Consumer(props) {

    const { state } = useLocation();
    const email = state['email'];
    const [datasets, setDatasets] = useState([]);
    const setStatus = (item, status) => {
        console.log(item, status);
        const dataToSend = {
            name: item['name'],
            version: item['version'],
            published_by: item['published_by'],
            requestedBy: email
        }
        if (status === 1) {
            axios.post('http://127.0.0.1:5000/request_by_consumer_for_a_dataset', dataToSend).then(response => {
                console.log(response);
                getDatasets();
            });

        }
    }
    const getDatasets = () => {
        const dataToSend = {
            requestedBy: email
        }
        axios.post('http://127.0.0.1:5000/get_datasets_for_consumer', dataToSend).then(response => {
            if (response.status === 200) {
                console.log(response);
                setDatasets(response.data['data']);
            }
            else {
                console.log(response.statusText);
            }
        })
    }
    const download = (item) => {
        console.log(item);
    }
    useEffect(() => {
        getDatasets();
    }, []);
    return (
        <div style={{
            background: "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
            margin: 'auto',
            height: '100vh',
            justifyContent: 'center',
            placeContent: 'center'

        }} className="container-fluid text-center">
            <div>
                <h2 className="pt-5 pb-3">All Available Datasets</h2>
                <Table striped bordered hover responsive size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>Database Name</th>
                            <th>Version</th>
                            <th>Published By</th>
                            <th>Actions</th>
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
                                        {item['state'] === -1 &&
                                            <td><Button type="primary" onClick={() => setStatus(item, 1)}>Request to Download</Button></td>
                                        }
                                        {item['state'] === 1 && <td><Button disabled type="primary">Pending</Button></td>}
                                        {item['state'] === 2 && <td><Button type="primary" onClick={() => download(item)}>Download</Button></td>}
                                        {item['state'] === 0 && <td><Button disabled type="primary">Download</Button></td>}

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