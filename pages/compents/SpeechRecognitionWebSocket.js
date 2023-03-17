import { useEffect } from "react";
import { w3cwebsocket as WebSocket } from 'websocket';
import {useDispatch} from 'react-redux'

let connect = null
export  const  SpeechRecognitionWebSocket = (props) => {

    useEffect(() => {

    }, []);
  };

  export const GetConnections = (langage, dispatch) => {
    return startConnect(langage, dispatch)
  }
  export const CloseConnect = () => {
    console.log("shut down connection")
    connect.close()
    // connect.onclose()
  }
  export const SendData = (data, dispatch) => {
      if (connect.readyState === 1) {
        connect.send(data);
      } else {
        startConnect(data, dispatch);
      }
  }

  const startConnect = async (data, dispatch) => {
    const langage = data;
    const connection = new WebSocket('ws://localhost:8002/');
    connect = connection;
    connection.onopen = () => {
      connect.send(langage);
      console.log('WebSocket client re-start connected...');
      console.log("re start backend side connected");
    };

    connection.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    connection.onmessage = (e) => {
      console.log("Received?: '" + e.data + "'");
      if (e.data === "no value" && connect.readyState === 1) {
        connect.send("re-start speeh");
        dispatch({type:"MESSAGE_INFO", msgInfo: "No Data matched, please try again"})
      } else {
        if (typeof e.data === "string" && !e.data.includes("transcription")) {
          dispatch({type:"MESSAGE_INFO", msgInfo: e.data})
        } else {
          const v = JSON.parse(e.data);
          console.log(v['transcription'], "####")
          connect.send("go on speeh");
          dispatch({type:"MESSAGE_INFO", msgInfo: v['transcription']})
        }
      }
    };

    return connect;
  }
  
  // export default SpeechRecognitionWebSocket;