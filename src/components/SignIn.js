import React, { useState,useEffect } from 'react';
import './SignIn.css';
import 'firebase/compat/app'
import 'firebase/compat/auth';
import firebase from "../firebase";
import { getAuth, updateProfile } from "firebase/auth";
import "firebase/compat/database";

import {GoogleAuthProvider} from "firebase/auth";


function SignIn(props) {        
    var db=firebase.database();
    const user = firebase.auth().currentUser;
    

    function signin(){
        var txtEmail = document.getElementById('inemail');
        var txtPassword = document.getElementById('inpassword');
        var email = txtEmail.value;
        var password = txtPassword.value;


        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            props.getready(true);
        }).catch(e => console.log(e.message));
    }
    

    function signinwithgoogle(){
        var provider =new GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(()=>{
            props.getready(true);
        }).catch(e => console.log(e.message));
    }        

    useEffect(() => {
        var input = document.getElementById("inpassword");
        // Execute a function when the user releases a key on the keyboard
        input.addEventListener("keyup", function(event) {
          if (event.keyCode === 13) {
              signin()
          }
        });
    });


    
    
    return(
        <div className="login-form">
        <div className="form">
            <h1>Login</h1>
            <div className="content">
                <div className="input-field">
                    <input  placeholder="Email" id="inemail" type="text"></input>
                </div>
                <div className="input-field">
                    <input placeholder="Password" id="inpassword" type="text"></input>
                </div>
                <div className="action">
                    <button onClick={signin}>Sign In</button>
                    <button onClick={signinwithgoogle}>Sign In with Google</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SignIn