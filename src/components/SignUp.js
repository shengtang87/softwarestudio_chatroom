import React, { useState,useEffect } from 'react';
// import './SignUp.css';
import 'firebase/compat/app'
import 'firebase/compat/auth';
import firebase from "../firebase";
import { getAuth, updateProfile } from "firebase/auth";
import "firebase/compat/database";


function SignUp(props) {
    var db=firebase.database();
    const user = firebase.auth().currentUser;


    function signup(){
        var username = document.getElementById("upname").value;
        var email = document.getElementById('upemail').value;
        var password = document.getElementById('uppassword').value;
        
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            const auth = getAuth();
            updateProfile(auth.currentUser, {
                displayName:username,
              }).then(() => {
                  console.log("success signup")
                  props.getready(true);
              }).catch((error) => {
                console.log(error.errorMessage)
              });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            console.error(error);
            }
            // [END_EXCLUDE]
        });
    }

    useEffect(() => {
        var input = document.getElementById("uppassword");
        // Execute a function when the user releases a key on the keyboard
        input.addEventListener("keyup", function(event) {
          if (event.keyCode === 13) {
              signup()
          }
        });
    });
    

    return(
        <div className="login-form">
            <div className="form">
                <h1>SignUp</h1>
                <div className="content">
                    <div className="input-field">
                        <input placeholder="NickName" id="upname" type="text"></input>
                    </div>
                    <div className="input-field">
                        <input  placeholder="Email" id="upemail" type="text"></input>
                    </div>
                    <div className="input-field">
                        <input placeholder="Password" id="uppassword" type="text"></input>
                    </div>
                    <div className="action">
                        <button onClick={signup}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default SignUp