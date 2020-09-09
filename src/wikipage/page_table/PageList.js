import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import localDbUrl from '../../axios/Axios';
import DrawTable from '../DrawTable';

const PageList = () => {

  const [allPageFromDb, setAllPageFromDb] = useState([]);

  const history = useHistory();

  const redirectToErrorPage = useCallback(() => history.push('/error'), [history]);

  useEffect(() => {
    localDbUrl.get('/readAll')
      .then(response => {
        console.log(response);
        setAllPageFromDb(response.data);
      })
      .catch((error) => {
        redirectToErrorPage();
        console.log(error);
      });
  }, [])

  return (
    <div>
      <h4 align="center">List of pages</h4>
      <DrawTable allPageFromDb={allPageFromDb} />
    </div>
  );
}

export default PageList;