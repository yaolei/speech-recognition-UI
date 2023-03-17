import HeaderView from './header'
import {useRef, useState, useEffect} from 'react'
// import {AudioContext, Audioinit} from './audioContext'
import  {ConnectPost,ConnectPath } from '../../pages/api/connect'
import {GetConnections, SendData, CloseConnect, SpeechRecognitionWebSocket} from './SpeechRecognitionWebSocket';
import {useSelector, useDispatch } from 'react-redux'
const params = {
    title: "new Layout",
    linkUrl: "chatBox"
}

const styles = {
    base: {
        width: 500,
        height: 300,
        backgroundColor:"green",
    },
    testAre: {
        width: 500,
        height: 300,
    }

}
// const context = new AudioContext()
export default function LayoutView ({re}) {
    const _btn1 = useRef();
    const [audiostates, setAudiostates] = useState(null);
    const [videoStream, setVideStream] = useState(null);
    const [videoRecorder, setVideRecorder] = useState(null);
    const [langagePack, setLangagePack] = useState("zh-CN");
    const [espeak, setEspeak] = useState("");
    const _inputValue = useRef();
    let chunks = [];
    const stock_state = useSelector((state)=> state.stock_state);
    const stock_msg = useSelector(state => state.msgInfo)
    const dispatch = useDispatch();
    const getMicrophone = async () => {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        //   video: {width: 300, height: 300}
        }).then((mediaStream) => {
            document.querySelector("video").srcObject = mediaStream;
            const options = {
                audioBitsPerSecond: 128000,
                // videoBitsPerSecond: 2500000,
                mimeType: "audio/webm",
                // mimeType: "video/webm",
              };
            const mediaRecorder = new MediaRecorder(mediaStream);

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
                if (mediaRecorder.state === "inactive") {

                    // const blob = new Blob(chunks, { type: "audio/wav"  });
                    const blob = new Blob(chunks, { type: "audio/webm"  });
                    // const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus"  });
                    sendSteamMessage(blob);
                    handleStoreAudio(blob, `newFile.wav`)
                }
            };

            mediaRecorder.start();

            console.log(mediaRecorder.state);
            console.log("recorder started");

            setVideRecorder(mediaRecorder);
            setAudiostates(true);
            setVideStream(mediaStream);
        })
    }


    const stopMicrophone = async () => {
        videoStream.getTracks().forEach(track => track.stop());
        videoRecorder.stop();

        console.log(videoRecorder.state);
        console.log("recorder stopped");

        setVideStream(null)
        setAudiostates(false)
    }


    const handleStoreAudio = (blob, fileName) => {
        document.querySelector('#' + fileName);
        let d = document.createElement("a");
        document.body.appendChild(d);
        d.style = "display:none;"

        let url = window.URL.createObjectURL(blob);

        d.href = url;
        d.download = fileName;
        d.click = () => {
            window.URL.revokeObjectURL(url);
        }
    }

    const sendPostSteamMessage = async() => {
        let formData = new FormData();
        // let fileName = `test-stream`;
        // formData.append('audio', blob_file, fileName);
        formData.append("a", "####")
        const res = await ConnectPost(ConnectPath("getMediaStream"), formData, true)
    }

    const sendSteamMessage = async (statues) => {
        const options = {
            isOpenMicphone: statues
        }
        const reg = await ConnectPost(ConnectPath("getMediaStream"), options);
        if (reg && reg.length === 0) {
            setEspeak("Got it! Now to recognize it...");
        } else {
            setEspeak(reg);
        }
        
        // return JSON.parse(JSON.stringify({res}));
    }

        // if (audiostates) {
        //     sendSteamMessage(false);
        //     setAudiostates(false);
        //     setEspeak("")
        //     // stopMicrophone();
        // } else {
        //     sendSteamMessage(true);
        //     setAudiostates(true);
        // //  getMicrophone();
        //     SendData(v);

        // }


    const toggleMicrophone = () => {
        // const v = _inputValue.current.value
        dispatch({type:"SOCKET_STATE", stock_state:!stock_state})

        if (stock_state) {
            console.log(langagePack)
            GetConnections(langagePack, dispatch);
        } else {
            CloseConnect()
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            dispatch({type:"SOCKET_STATE", stock_state:!stock_state})
            SendData("send msg", dispatch);
          }
    }
    const handleChangeLange = (e) => {
        if (langagePack != e.target.value) {
            setLangagePack(e.target.value)
        }
    }

    return (
        <>
            <HeaderView props = {params} />
                <div className="App">
                    <main>
                    <div className="controls">
                        <button 
                            onClick={toggleMicrophone} 
                            style={styles.base}
                            // onKeyDown={handleKeyDown}
                            >
                        {stock_state ?'Get microphone input': 'Stop microphone'}
                        </button>
                    </div>
                    {/* <div>
                        <video autoPlay />
                    </div> */}
                    <div>
                        <SpeechRecognitionWebSocket 
                        // dispatch={dispatch}
                        />
                    </div>
                    <select onChange={handleChangeLange} defaultValue={langagePack} >
                        <option value="zh-CN">中文</option>
                        <option value="en-US">English</option>
                    </select>
                    <div>
                        <input type = "textarea" 
                            placeholder= {"This are display what you say"}
                            style={styles.testAre}
                            value ={stock_msg}
                            ref= {_inputValue}
                            readOnly
                            // onChange={sendMsg}
                            />
                    </div>
                    <input type="button" onClick={sendPostSteamMessage} value="aaa" />
                    </main>
                </div>
        </>
    )
}