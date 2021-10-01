import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
import ReadMoreReact from 'read-more-react';


const PostCard = ({ postItem }) => {

    const { state, dispatch } = useContext(UserContext);
    const [likeCount, setCount] = useState(postItem.likes.length);
    const [liked, setLikedState] = useState(postItem.likes.includes(state._id));
    const [commentList, setCommentList] = useState(postItem.comments);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);


    const likePost = async () => {
        setCount(likeCount + 1);
        setLikedState(true);
        const res = await fetch("https://twimbit-api.herokuapp.com/api/post/likePost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: postItem._id,
            }),
        });
        if (res.status === 200) {

        } else {
            M.toast({ html: "Some Error Occured", classes: "#c62828 red darken-3" });
        }

    }

    const unlikePost = async () => {
        setCount(likeCount - 1);
        setLikedState(false);
        const res = await fetch("https://twimbit-api.herokuapp.com/api/post/unlikePost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: postItem._id,
            }),
        });

        if (res.status === 200) {

        } else {
            M.toast({ html: "Some Error Occured", classes: "#c62828 red darken-3" });
        }

    }

    const postComment = async () => {
        setLoading(true);
        setComment('');
        const res = await fetch("https://twimbit-api.herokuapp.com/api/post/commentPost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: postItem._id,
                text: comment,
            }),
        });
        const data = await res.json();
        if (res.status === 201) {
            console.log(data);
            const newList = commentList.concat(data);
            console.log(newList);

            setCommentList(newList);
            setLoading(false);
        } else {
            M.toast({ html: "Some Error Occured", classes: "#c62828 red darken-3" });
        }
    }



    return (
        <div className="card grey darken-1" style={{ width: "100%" }} key={postItem._id}>
            <div className="card-content white-text">
                <span style={{ color: 'black', fontSize: "2.5rem", fontWeight: 'normal' }} className="card-title">Posted By:- {postItem.postedBy.name.toUpperCase()}</span>
                <div>
                    <h2 style={{ color: 'white' }}>{postItem.title}</h2>
                </div>
                <Link to={{ pathname: "/postDetails", state: { postedBy: postItem.postedBy.name, title: postItem.title, content: postItem.content } }} style={{ color: "black", fontSize: "1.5rem" }}><ReadMoreReact text={postItem.content}
                    min={30}
                    ideal={30}
                    max={30}
                    readMoreText="Know More.." /></Link>

                <div style={{ marginTop: "1rem", display: "flex" }} >
                    {liked ?
                        (<i className="material-icons" onClick={() => { unlikePost() }}>thumb_up</i>)
                        :
                        (<i className="material-icons" onClick={() => { likePost() }}>thumb_down</i>)
                    }
                    <span><h6>{likeCount} likes</h6></span>
                </div>

                <div>
                    <h5 style={{ color: 'white' }}>Comments</h5>
                </div>

                {commentList.map((comment, i) => {
                    return (<div key={i}>
                        <h6 style={{ color: '#1F51FF' }}>{comment.postedBy.name.toUpperCase()}</h6>
                        <p style={{ color: 'black', padding: '0px' }}> {comment.text}</p>
                        <hr />
                    </div>)
                })}
                {loading ? <div className="loader" style={{ position: "absolute", bottom: "50%", right: " 50%" }}>
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-green-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div> : <div>
                </div>}
                <div style={{ marginTop: '2rem' }}>
                    <form onSubmit={(e) => { e.preventDefault(); postComment() }}>
                        <input type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Add a Comment" />
                        <input type="submit" value="Comment" className="btn waves-effect waves-light #64b5f6 blue lighten-2" />
                    </form>
                </div>
            </div>

        </div >
    );
}

export default PostCard;