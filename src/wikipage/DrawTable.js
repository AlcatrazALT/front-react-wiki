import React from 'react';
import PageTableRow from '../wikipage/page_table/PageTableRow';

const DrawTable = (props) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>PageId</th>
                        <th>Title</th>
                        <th>Snippet</th>
                        <th>Timestamp</th>
                        <th colSpan="4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.allPageFromDb.map(pageTableRow => (
                        <PageTableRow pageTableRow={pageTableRow} key={pageTableRow.id} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DrawTable;
