import React from "react";

import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();


var authEndpoint = "http://localhost:4000";
var sdkKey = "KLwKG2_iSSyiNQf9UfYJPg";
var meetingNumber = "85867005938";
var passWord = "C00Kiy";
var role = 0;
var userName = "Samee Ur Rehman";
var userEmail = "samee6812@gmail.com";
var registrantToken = "";
var zakToken = "";
var leaveUrl = "http://localhost:3000";


function App() {
  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("signature : ",response.signature)
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        console.log("init success : ",success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log("start meeting success : ", success);
          },
          error: (error) => {
            console.log("start meeting error : ", error);
          },
        });
      },
      error: (error) => {
        console.log("init error : ",error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
