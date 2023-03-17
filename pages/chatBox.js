import {useState, useRef, useEffect} from 'react'
import  {ConnectPost, ConnectGet, ConnectPath} from '../pages/api/connect'


const ChatBox = () => {
    const [chatMessage, setChatMessage] = useState("");
    const [chatHisMessage, setChatHisMessage] = useState([]);
    const _inputBox = useRef();

    useEffect(()=>{
        const keyDownHandler = event => {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSubChat();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    },[])


    const handleSubChat =  async() => {
        setChatHisMessage();
        if (_inputBox.current.value.length > 0) {
            // send value to server
            const res = await testFunc(_inputBox.current.value);
            console.log(res);
            let newMessage = chatHisMessage;
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;

            newMessage.push(
                <div key={Date.now()}>
                   <div className='chat-date-1'>{dateTime}:</div>
                   <div className='chat-date-1'>{_inputBox.current.value}</div>
                    
                </div>
            )
            setChatHisMessage(newMessage)
        }
        setChatMessage("");
    }

    const testFunc = async(v) => { 
        const options = {
            "id": 1,
            "name": v
        }
        const res = await ConnectPost(ConnectPath("chatInput"), options)
        return JSON.parse(JSON.stringify({res}));
    }

    const handleClearChat = () => {
        setChatHisMessage([]);
        setChatMessage("");
    }

    return (
        < >
            <input type= "text" 
              className="chat_textarea"
              placeholder="input something"
              ref = {_inputBox}
              onChange={()=> setChatMessage(_inputBox.current.value)}
              value ={chatMessage}
            />
            <button 
                type="button" className="chat-btn"
                onClick={handleSubChat}
            >Submit</button>
            <button 
                type="button" className="chat-btn"
                onClick={handleClearChat}
            >Clear Data</button>

            <section className='chat-history'>
                {chatHisMessage && chatHisMessage.length > 0?<div>{chatHisMessage}</div>:null}
            </section>
        </>
    )
}

export default ChatBox;