import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';



const PostDetail = () => {

    const history = useHistory();
    const location = useLocation()
    const { postedBy, title, content } = location.state


    return (
        <div className="row" style={{ marginTop: "10rem", textAlign: "center" }}>
            <div className="col s4 offset-l4">
                <div className="card blue-grey darken-1" style={{ width: "36rem" }}>
                    <div className="card-content white-text">
                        <span style={{ color: 'black', fontSize: "2rem" }} className="card-title">{postedBy.toUpperCase()}</span>
                        <div>
                            <h2 style={{ color: 'white' }}>{title}</h2>
                        </div>
                        <div>
                            <p>{content}</p>
                        </div>
                        <button style={{ marginTop: "3rem" }} type='submit' value="Register" className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => (history.goBack())}>GO BACK</button>

                    </div>

                </div >
            </div>
        </div>
    );
}


export default PostDetail