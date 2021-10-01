import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { NavBarContext } from "../../App";

const Navbar = () => {
    const history = useHistory()
    const [type, navBarState] = useContext(NavBarContext);

    function handleRoute(type) {

        if (type === 'login') {
            localStorage.clear();
            navBarState({ page: 'login', userData: null });
            history.push('/login')
        }
        else if (type === 'createPost') {
            history.push('/createPost')
        }
    }

    if (type.page === 'login') {
        return (

            <nav className="nav__bar">
                <div className="nav__heading">
                    <h2>Welcome to Twimbit blogs</h2>
                </div>
                <div className="nav__link">
                    <Link to='/register' onClick={() => navBarState({ page: 'register', userData: null })} style={{ textDecoration: 'none', color: 'white' }}>
                        <h4>Don't have an account...<span style={{ color: "blue" }}>Register here!</span></h4>
                    </Link>
                </div>
            </nav>
        );
    } else if (type.page === 'register') {
        return (
            <nav className="nav__bar">
                <div className="nav__heading">
                    <h2>Welcome to Twimbit blogs</h2>
                </div>
                <div className="nav__link">
                    <Link to='/login' onClick={() => navBarState({ page: 'login', userData: null })} style={{ textDecoration: 'none', color: 'white' }}>
                        <h4>Login!</h4>
                    </Link>
                </div>
            </nav>
        );
    } else if (type.page === "logedIn") {
        return (
            <nav className="nav__bar">
                <div className="nav__heading">
                    <h2>Hi {type.userData.name.toUpperCase()}</h2>
                </div>
                <div className="nav__link">
                    <button className="btn #c62828 blue darken-3" onClick={() => { handleRoute('createPost') }}>Create  Post</button>
                    <button className="btn #c62828 red darken-3" style={{ marginLeft: '1rem' }} onClick={() => { handleRoute('login') }}>Logout</button>
                </div>
            </nav>
        );

    }
}

export default Navbar;