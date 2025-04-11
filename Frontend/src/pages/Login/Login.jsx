import React from 'react';
import './Login.css';

const Login = () => {
    return ( 
        <div className="login-page">
            <div className="login-container">
                <form action="/login" method="POST" className="login-form">
                    <input type="email" name="email" placeholder="Email" required/>
                    <input type="password" name="password" placeholder="password" required/>
                    <button type="submit">Zaloguj</button>
                </form>
            </div>
        </div>
    );
}
 
export default Login;