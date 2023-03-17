import React, { useState,useEffect } from 'react';
import './App.css';
import SignWays from './components/SignWays'
import Chat from './components/Chat'
import firebase from './firebase';
import "firebase/compat/database";
import "firebase/compat/messaging";


// db.ref("root"+"/users"+"/"+user.uid+"/mail").set({
//   mail:user.email
// });



function App() {
  const [uuser, setUser] = useState(null);
  const [name,loadname]=useState(null)
  const [ready, setready] = useState(false)

  var db=firebase.database();
  const user = firebase.auth().currentUser;

  // const messaging=firebase.messaging();
  // messaging.getToken()


  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log('logged in');
  //       setUser(user)
  //       setTimeout(() => {
  //         getready(true)
  //       }, 1000);
  //   }
  //   else{
  //     console.log('not logged in');
  //     setUser(null)
  //   }
  // });

  function getready(ok){
    if(ok) {      
      setready(true);
    }
    else setready(false)
  }
  // function addroom(){
  //   addroomcount(roomcount+1);
  // }

  return (
    <div className="App">
      {ready ? 
        <div>
          <Chat getready={getready}/>
        </div>:
        <div>
          <SignWays getready={getready} />
        </div>
      }
    </div>
  );
}

export default App;