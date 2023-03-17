import firebase from '../firebase';
import './Chat.css';
import React, { useState,useEffect } from 'react';
import "firebase/compat/database";



function Chat(props){    
    const user = firebase.auth().currentUser;
    const [nowroom,changeroom]=useState("Public");
    const [roomname,changeroomname]=useState("Public");
    var name=user.displayName;

    var roomcount;
    var cnt;
    var db=firebase.database();

    useEffect(() => {
        // console.log(user)
        console.log('nowin: '+nowroom);
        if(user){
            db.ref("root"+"/users"+"/"+user.uid+"/infor").set({
                mail:user.email,
                uid:user.uid
            });

            var input = document.getElementById("message-input");

            // Execute a function when the user releases a key on the keyboard
            input.addEventListener("keyup", function(event) {
              if (event.keyCode === 13) {
                sendmessage()
              }
            });


            //roomcheckbox
            // db.ref("root"+"/users"+"/"+user.uid).orderByChild("okroom").once('value', function(snapshot) {
            db.ref("root"+"/users"+"/"+user.uid).on('value', function(snapshot) {
                var ul = document.getElementById("roomlist");
                removeAllChildNodes(ul);
        
                snapshot.forEach(function (item) {
        
                    if(item.hasChild('/okroom')){

                        var ok=item.child('/okroom').val();                        
                        var butt=document.createElement('button');
                        butt.id = "b"+ok;
                        // console.log(butt.id)
                        butt.innerHTML=item.child('/roomname').val();
                        butt.onclick = function() {
                            // console.log(butt.id);
                            changeroom(ok)
                            changeroomname(butt.innerHTML)
                            // toggle(butt)
                        };
                        ul.appendChild(butt);

                        
                    }
                })
            });


            //readingtext
            db.ref("root"+"/room"+nowroom).on('value', function(snapshot) {
                var ul = document.getElementById("messages");
                removeAllChildNodes(ul);   
                snapshot.forEach(function (item) {
                    // 要加上for each才能按照順序把資料撈出來
                    if(item.child("/message").exists()&&item.child("/message").val()!=""){
                        const txt=item.child("/message").val();
                        const n=item.child("/sender").val();                     
                        var p = document.createElement("p");
                        if(n==user.displayName){

                            var b=document.createElement('button');          
                            b.innerHTML="delete";
                            b.id=item.key;
                            b.className='res';
                            console.log(b.id)
                            b.onclick = function() {
                                remes(b.id);
                            };

                            p.className="my";
                            p.appendChild(document.createTextNode(txt+" :"));
                            ul.appendChild(p);
                            ul.appendChild(b);

                        }
                        else {
                            p.className="not";                            
                            p.appendChild(document.createTextNode(n+": "+txt));
                            ul.appendChild(p);
                        }
                    }
                })                
                const element1 = document.getElementById("messages");
                element1.scrollIntoView(false);
                const element2= document.getElementById("roomlist");
                element2.scrollIntoView(false);
            });


            var room=document.getElementById("inwhat")
            room.innerHTML="Room: "+roomname;



            
        }
    });

    db.ref("/root/roomcnt").once('value', function(snapshot) {
      cnt=snapshot.child("/cnt").val();
    });

    function remes(k){
        db.ref("root"+"/room"+nowroom+"/"+k).set({
            message:"",
            sender:user.displayName
        });
    }
    
    // function toggle(btn) {        
    //     var list = document.getElementById("roomlist").childNodes;
    //     for (var i = 0; i < list.length; i++) {
    //         list[i].className = 'no';  //clear all of them
    //     }
    //     btn.className='yes';
    // }
    
    function sendmessage(){
        var message=document.getElementById("message-input");
        if(message.value!=""){
            db.ref("root"+"/room"+nowroom).push({
                sender:name,
                message:message.value,
            }).catch(e => console.log(e.message));
            message.value="";
        }
    }

    function Creatchat(){
        var inp =prompt("Room name:");
        if(inp===""){
            var notifyConfig = {
                body: '\\ ^o^ /', // 設定內容
                icon: '../img/fuck.png', // 設定 icon
              };                              
              if (Notification.permission === 'default' || Notification.permission === 'undefined') {
                Notification.requestPermission(function(permission) {
                  if (permission === 'granted') {
                    // 使用者同意授權
                    var notification = new Notification("Must Have Name", notifyConfig); // 建立通知
                  }
                });
              }else if(Notification.permission === 'granted'){                              
                var notification = new Notification("Must Have Name", notifyConfig); // 建立通知
              }
        }
        if(inp!=null&&inp!=""){
            cnt++;
            db.ref("root"+"/room"+cnt+"/"+user.uid).set({
                uid:user.uid,
            });

            db.ref("root"+"/users"+"/"+user.uid).push({
                okroom:cnt,
                roomname:inp
            });

            db.ref("root"+"/roomcnt").set({
                cnt:cnt,
            });
            changeroom(cnt)
            changeroomname(inp)
        }
    }
    
    function Invite(){
        if(roomname==='Public'){            
            var notifyConfig = {
                body: '\\ ^o^ /', // 設定內容
                icon: '../img/fuck.png', // 設定 icon
              };                              
              if (Notification.permission === 'default' || Notification.permission === 'undefined') {
                Notification.requestPermission(function(permission) {
                  if (permission === 'granted') {
                    // 使用者同意授權
                    var notification = new Notification("Can't Invite in Public", notifyConfig); // 建立通知
                  }
                });
              }else if(Notification.permission === 'granted'){                              
                var notification = new Notification("Can't Invite in Public", notifyConfig); // 建立通知
              }
        }
        else{
            var invitemail=prompt("Inviting Email:");
            if(invitemail==user.email){         
                var notifyConfig = {
                    body: '\\ ^o^ /', // 設定內容
                    icon: '../img/fuck.png', // 設定 icon
                  };                              
                  if (Notification.permission === 'default' || Notification.permission === 'undefined') {
                    Notification.requestPermission(function(permission) {
                      if (permission === 'granted') {
                        // 使用者同意授權
                        var notification = new Notification("Inviting yourself?", notifyConfig); // 建立通知
                      }
                    });
                  }else if(Notification.permission === 'granted'){                              
                    var notification = new Notification("Inviting yourself?", notifyConfig); // 建立通知
                  }    
            }
            else{
                if(invitemail!=null){
                // if(true){
                var id;                
                var flag=false;
                var flag2=false;
                var n;
                var w;
                    db.ref("root"+"/users").once('value', function(snapshot) {
                        snapshot.forEach(function (item) {
                            // console.log(item.child("infor").child("mail").val())   //輸出所有資料
                            if(item.child("infor").hasChild("mail")&&(item.child("infor").child("uid").val()!=user.uid)){
                                if(invitemail===item.child("infor").child("mail").val()&&!flag){
                                    //found match email
                                    flag=true;
                                // if(true){
                                   n=document.getElementById("b"+nowroom);
                                   w=n.innerHTML;
                                    id=item.child("infor").child("uid").val();

                                    
                                    // console.log(snapshot.child(id).val())
                                    snapshot.child(id).forEach(function (item) {
                                        //item -> ever room the matched email is in
                                        if(!flag2){
                                            if(item.hasChild('okroom')){
                                                if(item.child('okroom').val()==nowroom){
                                                    flag2=true;
                                                    // alert(87);
                                                // console.log(item.child('okroom').val());
                                                }
                                            }
                                        }
                                    }) 
                                }
                            }
                        })
                        if(!flag2&&flag){
                            var notifyConfig = {
                                body: '\\ ^o^ /', // 設定內容
                                icon: '../img/fuck.png', // 設定 icon
                            };
                            
                            if (Notification.permission === 'default' || Notification.permission === 'undefined') {
                            Notification.requestPermission(function(permission) {
                                if (permission === 'granted') {
                                // 使用者同意授權
                                var notification = new Notification('Successfully added', notifyConfig); // 建立通知
                                }
                            });
                            }else if(Notification.permission === 'granted'){                              
                                var notification = new Notification("Successfully added", notifyConfig); // 建立通知
                            }

                            db.ref("root"+"/room"+nowroom+"/"+id).set({
                                uid:id
                            });
                            db.ref("root"+"/users"+"/"+id).push({
                                okroom:nowroom,
                                roomname:w
                            });
                        }
                        else if(flag&&flag2){
                            var notifyConfig = {
                                body: '\\ ^o^ /', // 設定內容
                                icon: '../img/fuck.png', // 設定 icon
                              };                              
                              if (Notification.permission === 'default' || Notification.permission === 'undefined') {
                                Notification.requestPermission(function(permission) {
                                  if (permission === 'granted') {
                                    // 使用者同意授權
                                    var notification = new Notification("Already inside", notifyConfig); // 建立通知
                                  }
                                });
                              }else if(Notification.permission === 'granted'){                              
                                var notification = new Notification("Already inside", notifyConfig); // 建立通知
                              }
                        }
                        if(!flag){
                            var notifyConfig = {
                                body: '\\ ^o^ /', // 設定內容
                                icon: '../img/fuck.png', // 設定 icon
                              };                              
                              if (Notification.permission === 'default' || Notification.permission === 'undefined') {
                                Notification.requestPermission(function(permission) {
                                  if (permission === 'granted') {
                                    // 使用者同意授權
                                    var notification = new Notification("No User", notifyConfig); // 建立通知
                                  }
                                });
                              }else if(Notification.permission === 'granted'){                              
                                var notification = new Notification("No User", notifyConfig); // 建立通知
                              }
                        }
                    });
                }
            }
        }
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function toPublic(){
        changeroom("Public")
        changeroomname("Public")
    }
    function signout() {
        firebase.auth().signOut().then(()=>{
            props.getready(false);
        }).catch(e => console.log(e.message));
    }

    return(
    <div className='contain'>
        <div className='chat' id="chat">
            <div className='roombox'>
                <div className='room'>
                    <button id="bPublic" onClick={toPublic}>Public</button>
                    <div className='roomlistcon'>
                        <ul className='roomlist' id="roomlist"></ul>
                    </div>
                </div>
                <div className='tool'>
                    <button id="makeroom" onClick={Creatchat}>Create Room</button>
                    <button id='out' onClick={signout}>Sign Out</button>
                </div>
            </div>
            <div className='msgbox'>
                <div className='inf'>
                    <p id="inwhat"></p>
                    <p id="name">{name}</p>
                </div>
                <div className='words'>
                    <ul className='messagelist' id="messages"></ul>
                </div>
                <div className='input'>
                    <button id="invite" onClick={Invite}>Invite</button>
                    <input placeholder="Message..." id="message-input" type="text" />
                    <button id="message-btn" onClick={sendmessage}>Send</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Chat