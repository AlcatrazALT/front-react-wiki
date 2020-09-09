import React, { useState, useEffect } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import localDbUrl from '../../axios/Axios';

const UpdatePage = (props) => {

    const initPageValues = () => {
        return {
            id: '',
            title: '',
            snippet: '',
            timestamp: ''
        };
    }

    const [page, setPage] = useState(initPageValues());

    const [originalPageData, setOriginalPageData] = useState({
        id: '',
        title: '',
        snippet: '',
        timestamp: ''
    })

    useEffect(() => {
        localDbUrl.get(props.match.params.id)
            .then(response => {
                bindResponceData(setPage, response);
            })
            .catch(error => {
                console.log(error);
                props.history.push('/error');
            })
    }, [])

    const bindResponceData = (updatePageValues, response) => {
        updatePageValues({
            id: response.data.id,
            title: response.data.title,
            snippet: response.data.snippet,
            timestamp: response.data.timestamp
        });

        setOriginalPageData({
            id: response.data.id,
            title: response.data.title,
            snippet: response.data.snippet,
            timestamp: response.data.timestamp
        });
    }

    const handleChange = (e) => {
        setPage({ ...page, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        localDbUrl.put('/update/' + props.match.params.id, {
            id: page.id,
            title: page.title,
            snippet: page.snippet,
            timestamp: page.timestamp
        })
            .then((responce) => {
                console.log(responce);
                alert("Page Update Successfully");
                props.history.push('/page_list')
            })
            .catch(error => {
                props.history.push('/error');
                console.log(error);
            })
    }

    const cancelUpdatePageData = (e) => {
        setPage({
            id: originalPageData.id,
            title: originalPageData.title,
            snippet: originalPageData.snippet,
            timestamp: originalPageData.timestamp
        })
    }

    return (
        <Container className="App">
            <h4 className="PageHeading">Update page data</h4>
            <Form className="form">
                <Col>
                    <FormGroup row>
                        <Label for="Password" sm={2}>title</Label>
                        <Col sm={10}>
                            <Input type="text" name="title" value={page.title} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Password" sm={2}>snippet</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="snippet" value={page.snippet} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup row>
                        <Col sm={5}>
                        </Col>
                        <Col sm={1}>
                            <Button type="submit" onClick={onSubmit} className="btn btn-success">Submit</Button>{' '}
                        </Col>
                        <Col sm={1}>
                            <Button type="button" onClick={cancelUpdatePageData} className="btn btn-danger">Cancel</Button>
                        </Col>
                        <Col sm={5}>
                        </Col>
                    </FormGroup>
                </Col>
            </Form>
        </Container>
    );
}

export default UpdatePage;