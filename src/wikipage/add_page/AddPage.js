import React, { useState, useCallback } from 'react';
import './AddPage.css';
import { useHistory } from 'react-router-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import localDbUrl from '../../axios/Axios';


const AddPage = () => {

    const initNewPageValues = () => {
        return { title: '', snippet: '' };
    }

    const [newPage, setNewPage] = useState(initNewPageValues());

    const history = useHistory();

    const redirectToErrorPage = useCallback(() => history.push('/error'), [history]);

    const backToList = useCallback(() => history.goBack(), [history]);

    const addpage = () => {
        localDbUrl.post('/create', bindDataToSendDb(newPage))
            .then(responce => {
                console.log(responce.data)
                alert("Page Save Successfully");
                backToList();
            })
            .catch(error => {
                console.log(error);
                redirectToErrorPage();
            })
    }

    const bindDataToSendDb = (newPage) => {
        return {
            title: newPage.title,
            snippet: newPage.snippet
        };
    }

    const clearForm = () => {
        setNewPage(initNewPageValues())
    }

    const handleChange = (e) => {
        setNewPage({ ...newPage, [e.target.name]: e.target.value })
    }

    return (
        <Container className="App">
            <h4 className="PageHeading">Enter page data</h4>
            <Form className="form">
                <Col>
                    <FormGroup row>
                        <Label for="address" sm={2}>Title</Label>
                        <Col sm={10}>
                            <Input type="text" name="title" onChange={handleChange} value={newPage.title} placeholder="title" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Password" sm={2}>Snippet</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="snippet" onChange={handleChange} value={newPage.snippet} placeholder="snippet" />
                        </Col>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup row>
                        <Col sm={5}>
                        </Col>
                        <Col sm={1}>
                            <Button type="button" onClick={addpage} className="btn btn-success">Submit</Button>
                        </Col>
                        <Col sm={1}>
                            <Button type="button" onClick={clearForm} className="btn btn-danger">Clear</Button>
                        </Col>
                        <Col sm={5}>
                        </Col>
                    </FormGroup>
                </Col>
            </Form>
        </Container>
    );
}

export default AddPage;
