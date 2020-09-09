import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PageTableRow = (props) => {

  const initPageValues = (props) => {
    return {
      id: props.pageTableRow.id,
      title: props.pageTableRow.title,
      snippet: props.pageTableRow.snippet,
      timestamp: props.pageTableRow.timestamp.substring(0, 10)
    };
  }

  const [page] = useState(initPageValues(props))

  return (
    <tr>
      <td>{page.id}</td>
      <td>{page.title}</td>
      <td>{page.snippet}</td>
      <td>{page.timestamp}</td>
      <td>
        <Link to={'/update/' + props.pageTableRow.id} className="btn btn-success">
          Update
          </Link>
      </td>
      <td>
        <Link to={'/delete/' + props.pageTableRow.id} className="btn btn-danger">
          Delete
          </Link>
      </td>
    </tr>
  );
}

export default PageTableRow;
