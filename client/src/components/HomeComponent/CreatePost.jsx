import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from "materialize-css";


const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const createPost = async () => {
        setLoading(true);

        const res = await fetch("https://twimbit-api.herokuapp.com/api/post/createPost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                title: title,
                content: content,
            }),
        });

        if (res.status === 200) {
            history.goBack();
            setLoading(false);
        } else {
            setLoading(false);
            M.toast({ html: "Some Error Occured", classes: "#c62828 red darken-3" });
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

    return (
        <div className="container" id="login__container">
            <div className="row" style={{ textAlign: 'center', marginTop: "8rem" }}>
                <h1>Create Post !!</h1>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); createPost() }}>
                <div className="row input__field">
                    <div className="input-field col s12 l6 offset-l3" >
                        <i className="material-icons prefix">local_bar</i>
                        <input required="true" placeholder="Title" id="icon_prefix" type="text" className="validate" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                    </div>
                </div>
                <div className="row">
                    <div className="input-field col col s12 l6 offset-l3" >
                        <i className="material-icons prefix">lightbulb_outline</i>
                        <textarea rows="4" cols="50" style={{ padding: '1rem' }} required="true" placeholder="Content" id="icon_telephone" type="text" className="validate" value={content} onChange={(e) => { setContent(e.target.value) }} />

                    </div>
                </div>
                <div className="row">
                    <div className="col s6 offset-s3" style={{ textAlign: 'center' }}>
                        <input type="submit" value="Create" className="btn waves-effect waves-light #64b5f6 blue lighten-2" />
                    </div>
                </div>

            </form>
        </div>


    );
}

export default CreatePost