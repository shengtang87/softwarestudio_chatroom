import React, { useState } from 'react';
import './SignWays.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

import 'firebase/compat/app'
import 'firebase/compat/auth';


function SignWays(props) {
    const [ways,choose] = useState(true)
    function change(){
        choose(!ways)
    }
    return(
        <div className="login-form">
            <div className="form">
                <div className="action">
                    {ways ? <SignIn getready={props.getready}/>: <SignUp getready={props.getready} />}
                    {ways ?  <p>No account ?</p>:<p>Already have account ?</p>}
                    
                    {ways ?<button onClick={change}>SignUp</button>:<button onClick={change}>SignIn</button>}
                </div>
            </div>
        </div>
    )
}

export default SignWays