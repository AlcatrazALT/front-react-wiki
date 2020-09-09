import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import localDbUrl from '../../axios/Axios';
import DrawTable from '../DrawTable';

const PageListWithSnippet = () => {

  const [allPageWithSnippetFromDb, setAllPageWithSnippetFromDb] = useState([])

  const history = useHistory();

  const redirectToErrorPage = useCallback(() => history.push('/error'), [history]);

  useEffect(() => {
    localDbUrl.get('/readAllWithSnippet')
      .then((response) => {
        setAllPageWithSnippetFromDb(response.data)
      })
      .catch((error) => {
        redirectToErrorPage();
        console.log(error);
      });
  }, [])

  return (
    <div>
      <h4 align="center">List of pages with snippet</h4>
      <DrawTable allPageFromDb={allPageWithSnippetFromDb} />
    </div>
  );
}

export default PageListWithSnippet;
