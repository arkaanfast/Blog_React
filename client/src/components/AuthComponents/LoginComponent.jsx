import React, { useState, useContext } from "react";
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import M from "materialize-css";


const Login = ({ callBack }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [email, emailState] = useState('');
  const [password, passwordState] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch("https://twimbit-api.herokuapp.com/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      localStorage.setItem('jwt', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      dispatch({ type: "USER", payload: data.user })
      callBack(data.user);
      history.push('/');
      M.toast({ html: "Successfully Loged In", classes: "#c62828 red darken-3" });
    } else if (res.status === 500) {
      M.toast({ html: data.message, classes: "#c62828 red darken-3" });
      emailState('');
      passwordState('');
      setLoading(false);
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
        <h1>Welcome !!</h1>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
        <div className="row input__field">
          <div className="input-field col s12 l6 offset-l3" >
            <i className="material-icons prefix">email</i>
            <input required="true" placeholder="Email" id="icon_prefix" type="email" className="validate" value={email} onChange={(e) => { emailState(e.target.value) }} />

          </div>
        </div>
        <div className="row">
          <div className="input-field col col s12 l6 offset-l3" >
            <i className="material-icons prefix">account_circle</i>
            <input required="true" placeholder="Password" id="icon_telephone" type="password" className="validate" value={password} onChange={(e) => { passwordState(e.target.value) }} />

          </div>
        </div>
        <div className="row">
          <div className="col s6 offset-s3" style={{ textAlign: 'center' }}>
            <input type="submit" value="Login" className="btn waves-effect waves-light #64b5f6 blue lighten-2" />
          </div>
        </div>

      </form>
    </div>


  );
}

export default Login;