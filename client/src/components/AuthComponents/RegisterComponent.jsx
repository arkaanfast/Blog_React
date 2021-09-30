import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import M from "materialize-css";



const Register = ({ callBack }) => {
    const history = useHistory();
    const [email, emailState] = useState('');
    const [password, passwordState] = useState('');
    const [name, nameState] = useState('');
    const [confirmPassword, confirmPasswordState] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (password === confirmPassword) {
            setLoading(true);
            const res = await fetch("https://twimbit-api.herokuapp.com/api/auth/register", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                }),
            });
            const data = await res.json();
            if (res.status === 201) {
                callBack();
                history.push('/login');
                M.toast({ html: "Login In to Continue", classes: "#c62828 red darken-3" });
            } else if (res.status === 500) {
                M.toast({ html: data.message, classes: "#c62828 red darken-3" });
                emailState('');
                nameState('');
                passwordState('');
                confirmPasswordState('');
                setLoading(false);
            }
        }
        else {
            return M.toast({
                html: "Passwords dont match",
                classes: "#c62828 red darken-3",
            });
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
            <form onSubmit={(e) => { e.preventDefault(); handleRegister() }}>
                <div className="row input__field">
                    <div className="input-field col s12 l6 offset-l3" >
                        <i className="material-icons prefix">email</i>
                        <input requried="true" placeholder="Email" id="icon_prefix" type="email" className="validate" value={email} onChange={(e) => { emailState(e.target.value) }} />

                    </div>
                </div>
                <div className="row input__field">
                    <div className="input-field col s12 l6 offset-l3" >
                        <i className="material-icons prefix">accessibility</i>
                        <input requried="true" placeholder="Name" id="icon_prefix1" type="text" className="validate" value={name} onChange={(e) => { nameState(e.target.value) }} />

                    </div>
                </div>
                <div className="row">
                    <div className="input-field col col s12 l6 offset-l3" >
                        <i className="material-icons prefix">account_circle</i>
                        <input requried="true" placeholder="Password" id="icon_telephone" type="password" className="validate" value={password} onChange={(e) => { passwordState(e.target.value) }} />

                    </div>
                </div>
                <div className="row">
                    <div className="input-field col col s12 l6 offset-l3" >
                        <i className="material-icons prefix">check_circle</i>
                        <input requried="true" placeholder="Confrim Password" id="icon_telephone1" type="password" className="validate" value={confirmPassword} onChange={(e) => { confirmPasswordState(e.target.value) }} />

                    </div>
                </div>
                <div className="row">
                    <div className="col s6 offset-s3" style={{ textAlign: 'center' }}>
                        <input type='submit' value="Register" className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => handleRegister()} />
                    </div>
                </div>
            </form>
        </div>


    );
}

export default Register;