import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Container, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

import FrescoView from './FrescoView';

function FrescoList(props) {
    const [data, setData] = useState([]);
    const [ascdesc, setAscDesc] = useState(true);
    const [requestData, setRequestData] = useState(new Date());
    const [detail, setDetail] = useState(false);

    useEffect(() => {
        const GetData = async () => {
            const result = await axios({
                method: 'get',
                url: `http://localhost:8081/frescoes/annee/${ascdesc === true ? 'asc' : 'desc'}`,
                headers: {
                    Accept: 'application/json',
                },
            });
            setData(Object.values(result.data.data));
        };

        GetData();
    }, [requestData, ascdesc]);

    const deleteFresco = async (parcelle, setRequestData) => {
        await axios({
            method: 'delete',
            url: `http://localhost:8081/frescoes/${parcelle}`,
            headers: {
                Accept: 'application/json',
            },
        }).then((result) => {
            setDetail(false);
            setRequestData(new Date());
        });
    };

    const showDetail = (parcelle) => {
        setDetail(parcelle);
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> Frescoes
                </CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Parcelle (ID)</th>
                                            <th>Proprietaire</th>
                                            <th>Mnemo</th>
                                            {/* Rajout pour simlifier le tri par année */}
                                            <th onClick={() => setAscDesc(!ascdesc)}>Année{ascdesc ? '↑' : '↓'}</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((fresco, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{fresco.PARCELLE}</td>
                                                    <td>{fresco.PROPRIETAIRE}</td>
                                                    <td>{fresco.MNEMO}</td>
                                                    <td>{fresco.ANNEE_CREATION}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => showDetail(fresco.PARCELLE)}
                                                            >
                                                                Détail
                                                            </button>
                                                            <button
                                                                disabled={detail !== fresco.PARCELLE}
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    deleteFresco(fresco.PARCELLE, setRequestData);
                                                                }}
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs="6">{detail && <FrescoView parcelle={detail} />}</Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </div>
    );
}

export default FrescoList;
