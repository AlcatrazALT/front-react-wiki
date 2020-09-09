import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddPage from './wikipage/add_page/AddPage';
import UpdatePage from './wikipage/update_page/UpdatePage';
import PageList from './wikipage/page_table/PageList';
import PageListWithSnippet from './wikipage/page_table/PageListWithSnippet';
import WikipediaApi from './wikipedia_api/WikipediaApi';
import DeletePage from './wikipage/delete_page/DeletePage';
import NotFound from './errors/NotFound';


const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-dark navheader">
          <div className="collapse navbar-collapse" >
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to={'/add_page'} className="nav-link">Add page</Link>
              </li>
              <li className="nav-item">
                <Link to={'/page_list'} className="nav-link">List of pages</Link>
              </li>
              <li className="nav-item">
                <Link to={'/page_list_snippet'} className="nav-link">List of pages with snippet</Link>
              </li>
              <li className="nav-item">
                <Link to={'/wiki_api'} className="nav-link">Wikipedia Api</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Switch>
          <Route path='/add_page' component={AddPage} />
          <Route exact path={['/', '/page_list']} component={PageList} />
          <Route path='/update/:id' component={UpdatePage} />
          <Route path='/delete/:id' component={DeletePage} />
          <Route path='/page_list_snippet' component={PageListWithSnippet} />
          <Route path='/wiki_api' component={WikipediaApi} />
          <Route path='/error' component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;