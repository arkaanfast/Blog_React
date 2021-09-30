import './App.css';
import React, { useReducer, useEffect, createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { reducer } from './reducers/userReducer';
import NavBar from './components/NavBarComponent/NavBarComponent';
import Register from './components/AuthComponents/RegisterComponent';
import Login from './components/AuthComponents/LoginComponent';
import Home from './components/HomeComponent/HomeComponent';
import PostDetail from './components/HomeComponent/PostDetail.jsx';
import CreatePost from './components/HomeComponent/CreatePost.jsx';

export const NavBarContext = createContext();
export const UserContext = createContext();

const Routing = ({ callBack }) => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({ type: "USER", payload: user })
            callBack(user);
            history.push('/')
        } else {
            history.push('/login')
        }
    }, [])

    return (
        <Switch>
            <Route path="/createPost">
                <CreatePost />
            </Route>
            <Route path="/postDetails">
                <PostDetail />
            </Route>
            <Route path="/register">
                <Register callBack={callBack} />
            </Route>
            <Route path="/login">
                <Login callBack={callBack} />
            </Route>
            <Route path="/">
                <Home />
            </Route>

        </Switch>
    );
};

function App() {
    const [type, navBarState] = useState({ page: 'login', userData: null });
    const [state, dispatch] = useReducer(reducer, null);

    function changeNavState(user) {
        dispatch({ type: "USER", payload: user })
        if (user) {
            navBarState({ page: 'logedIn', userData: user })
        } else {
            navBarState({ page: 'login' });
        }

    }

    return (
        <Router>
            <NavBarContext.Provider value={[type, navBarState]}>
                <NavBar />
            </NavBarContext.Provider>
            <UserContext.Provider value={{ state, dispatch }}>
                <Routing callBack={changeNavState} />
            </UserContext.Provider>
        </Router>
    );
}

export default App;
