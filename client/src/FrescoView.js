import React from 'react';
import { Card, CardBody, CardHeader, CardImg, Container, Col, Row } from 'reactstrap';

import axios from 'axios';
import { useState, useEffect } from 'react';

function FrescoView(props) {
    const [data, setData] = useState(props.parcelle);

    useEffect(() => {
        const GetData = async () => {
            const result = await axios({
                method: 'get',
                url: `http://localhost:8081/frescoes/${props.parcelle}`,
                headers: {
                    Accept: 'application/json',
                },
            });
            setData(result.data.data);
        };

        GetData();
    }, [props.parcelle]);

    return (
        <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i> Parcelle {data.PARCELLE}
            </CardHeader>
            <CardBody>
                <Container>
                    <Row>
                        <Col>Propriétaire</Col>
                        <Col>{data.PROPRIETAIRE}</Col>
                    </Row>
                    <Row>
                        <Col>Nmemo</Col>
                        <Col>{data.MNEMO}</Col>
                    </Row>
                    <Row>
                        <Col>Géo point</Col>
                        <Col>{data.GEO_POINT}</Col>
                    </Row>
                    <Row>
                        <Col>Nom rue</Col>
                        <Col>{data.NOM_RUE}</Col>
                    </Row>
                    <Row>
                        <Col>Commentaire</Col>
                        <Col>{data.COMMENTAIRE}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardImg top width="100%" src={data.PHOTO} alt={data.PARCELLE} />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
}

export default FrescoView;
