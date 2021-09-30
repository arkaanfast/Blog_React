import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import PostCard from './PostCards';
import Pagination from '../PaginationComponent/PaginationComponent';

let start = 0;

const Home = () => {
    const { state, dispatch } = useContext(UserContext);
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [totalPost, postCount] = useState(0);
    useEffect(() => getPosts(), []);

    const getPosts = async () => {
        setLoading(true);
        const res = await fetch(`https://twimbit-api.herokuapp.com/api/post/allPosts?start=${start}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        });

        const data = await res.json();
        if (res.status === 201) {
            setPostList(data.posts);
            setLoading(false);
            postCount(data.totalPosts);
        } else {
            setPostList([]);
        }
    }

    const paginate = async (pageNumber) => {
        start += 10;
        setLoading(true);
        console.log(localStorage.getItem("jwt"));
        const res = await fetch(`https://twimbit-api.herokuapp.com/api/post/allPosts?start=${start}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        });

        const data = await res.json();
        if (res.status === 201) {
            setPostList(postList.concat(data.posts));
            setLoading(false);
            setCurrentPage(pageNumber);
        } else {
            setPostList([]);
        }
    }



    if (loading) {
        return (
            <div className="loader" style={{
                position: "absolute",
                bottom: "50%",
                right: " 50%"
            }}>
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
            </div>
        )
    }

    const indexofLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexofLastPost - postsPerPage;
    const currentPosts = postList.slice(indexofFirstPost, indexofLastPost);

    const content = currentPosts.map((post) => {
        return (
            <div className="row" key={post._id}>
                <div className="col s4 offset-l4">
                    <PostCard postItem={post} />
                </div>
            </div>
        )
    })
    // const rows = [...Array(Math.ceil(postList.length / 5))];
    // const postRows = rows.map((row, idx) => postList.slice(idx * 4, idx * 4 + 4));
    // const content = postRows.map((row, idx) => (
    //     <div className="row" key={idx}>
    //         {row.map((post) => {
    //             return (
    //                 <div className="col s4 offset-l4" >
    //                     <PostCard postItem={post} />
    //                 </div>
    //             );
    //         })}
    //     </div>)
    // );



    return (
        <div className="container-fluid">

            <div className="row" style={{ textAlign: 'center' }}>
                <h1>These are the posts</h1>
            </div>
            {content}
            <Pagination postsPerPage={postsPerPage} totalPosts={totalPost} paginate={paginate} />
        </div >


    );
}

export default Home;