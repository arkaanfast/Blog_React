import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import PostCard from './PostCards';
import ReactPaginate from "react-paginate";
// import Pagination from '../PaginationComponent/PaginationComponent';

let start = 0;

const Home = () => {
    const { state, dispatch } = useContext(UserContext);
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(10);

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
            setPostList(data);
            setLoading(false);

        } else {
            setPostList([]);
        }
    }

    const paginate = async ({ selected }) => {
        setCurrentPage(selected);
        // start += 10;
        // setLoading(true);
        // console.log(localStorage.getItem("jwt"));
        // const res = await fetch(`https://twimbit-api.herokuapp.com/api/post/allPosts?start=${start}`, {
        //     headers: {
        //         Authorization: "Bearer " + localStorage.getItem("jwt"),
        //     },
        // });

        // const data = await res.json();
        // if (res.status === 201) {
        //     setPostList(postList.concat(data.posts));
        //     setLoading(false);

        // } else {
        //     setPostList([]);
        // }


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

    const indexofLastPost = (currentPage + 1) * postsPerPage;
    const indexofFirstPost = indexofLastPost - postsPerPage;
    const currentPosts = postList.slice(indexofFirstPost, indexofLastPost);

    const content = currentPosts.map((post) => {
        return (
            <div className="row" key={post._id}>
                <div className="col l4 offset-l4 s12">
                    <PostCard postItem={post} />
                </div>
            </div>
        )
    })
    // const rows = [...Array(Math.ceil(postList.length / 5))];
    // const postRows = rows.map((row, idx) => postList.slice(idx * 4, idx * 4 + 4));
    // const content = postRows.map((row, idx) => (
    //     <div className="row" style={{ textAlign: 'center' }} key={idx}>
    //         {row.map((post) => {
    //             return (
    //                 <div className="col s2" >
    //                     <PostCard postItem={post} />
    //                 </div>
    //             );
    //         })}
    //     </div>)
    // );

    const pageCount = Math.ceil(postList.length / postsPerPage);

    return (
        <div className="container-fluid">

            <div className="row" style={{ textAlign: 'center' }}>
                {postList.length > 0 ? <h1>These are the posts</h1> : <h1>No Posts Yet!</h1>}
            </div>
            {content}
            {postList.length > 0 ? <div className="App">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={paginate}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div> : <div></div>}
        </div >


    );
}

export default Home;