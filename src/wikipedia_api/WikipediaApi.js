import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Button } from 'reactstrap';
import './WikipediaApi.css';
import axios from 'axios';
import PaginationTable from './PaginationTable';

const WikipediaApi = (props) => {

  const [wikiSearchQuery, setWikiSearchQuery] = useState('');
  const [wikiSearchResultPages, setWikiSearchResultPages] = useState([]);

  const handleChange = (e) => {
    setWikiSearchQuery(e.target.value);
  }

  const searchQuery = (e) => {
    e.preventDefault();

    const baseWikiUrl = 'https://en.wikipedia.org/w/api.php';

    axios.get(baseWikiUrl, {
      params: {
        action: 'query',
        list: 'search',
        srlimit: '40',
        format: 'json',
        utf8: '1',
        origin: '*',
        srsearch: wikiSearchQuery,
      },
    })
      .then((responce) => {
        setWikiSearchResultPages(responce.data.query.search)
        console.log({ responce });
      })
      .catch((error) => {
        props.history.push('/error');
        console.log(error);
      });
  };

  const pages = wikiSearchResultPages.map((page) => {
    return (
      <tr>
        <td>{page.pageId}</td>
        <td>{page.title}</td>
        <td dangerouslySetInnerHTML={{ __html: page.snippet }}></td>
        <td>{page.timestamp}</td>
      </tr>
    );
  });

  return (
    <div>
      <h4 align="center">Wikipedia Api</h4>
      <Form className="form">
        <Col>
          <FormGroup row>
            <Col sm={10}>
              <Input
                type="text"
                name="wikiSearchQuery"
                onChange={handleChange}
                value={wikiSearchQuery}
                placeholder="Search in Wiki"
              />
            </Col>
            <Col>
              <Button
                type="button"
                className="SearchButton"
                onClick={searchQuery}>
                <span>Search</span>
              </Button>
            </Col>
          </FormGroup>
        </Col>
      </Form>
      <table className="table table-striped" style={{ marginTop: 10 }}>
        <PaginationTable
          itemsperpage={10}
          nocolumns={4}
          items={pages}
          pagesspan={4}
        />
      </table>
    </div>
  );
}

export default WikipediaApi;
