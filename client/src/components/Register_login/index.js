import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="right">
                        <h2>Introduceți coordonatele dvs. pentru accesarea situațiilor școlare:</h2>
                        <p>Daca nu ai deja un cont creat, esti binevenit la secretariatul universitatii</p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;
