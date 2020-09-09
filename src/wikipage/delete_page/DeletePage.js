import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import './DeletePage.css';
import localDbUrl from '../../axios/Axios';

const DeletePage = (props) => {

    const initNewPageValues = () => {
        return { id: '', title: '' };
    }

    const [page, setPage] = useState(initNewPageValues());

    useEffect(() => {
        localDbUrl.get('/' + props.match.params.id)
            .then(response => bindResponceData(setPage, response))
            .catch(error => {
                redirectToErrorPage();
                console.log(error);
            })
    }, [])

    const history = useHistory();

    const redirectToErrorPage = useCallback(() => history.push('/error'), [history]);

    const backToList = useCallback(() => history.goBack(), [history]);

    const bindResponceData = (setPageValues, response) => {
        setPageValues({
            id: response.data.id,
            title: response.data.title
        });
    }

    const deletePage = () => {
        localDbUrl.delete('/delete/' + props.match.params.id)
            .then(responce => {
                console.log(responce.data);
                alert('Page deleted successfully!!');
                backToList();
            })
            .catch(error => {
                redirectToErrorPage();
                console.log(error);
            })
    }

    return (
        <Container className="App">
            <h4 className="PageHeading">Are you sure you want to delete</h4>
            <h2>{page.title}</h2>
            <div className="box">
                <div className="boxButtons">
                    <button type="button" onClick={deletePage} className="btn btn-success">Yes</button>
                    <button type="button" onClick={backToList} className="btn btn-danger">No</button>
                </div>
            </div>
        </Container>
    );
}

export default DeletePage;