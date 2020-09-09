import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';




const NotFound = () => {

    const history = useHistory();

    const goBack = useCallback(() => history.goBack(), [history]);

    return (
        <div>
            <h2>Your request failed with an error. Change the request and repeat it again.</h2>
            <button className="btn btn-success" onClick={goBack}>Back</button>
        </div>
    )
}

export default NotFound;