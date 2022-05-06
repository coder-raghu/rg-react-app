import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { io } from "socket.io-client";
import { useUserContext } from "../../context/userContext";
import Messagebody from "./messageBody";
import axios from "axios";
import Loader from "../../global/Loader";

export default function Call() {

    // var init = 0;
    // const reducer = (state, action) => {
    //     if(action.type==="INCREMENT"){
    //         state = state + 1
    //     }

    //     if(action.type==="DECREMENT" && state>0){
    //         state = state - 1
    //     }

    //     return state;
    // }
    // const [state, dispatch] = useReducer(reducer , init)

    const { user } = useUserContext();

    const [loading, SetLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [selectedUserID, setSelectedUserID] = useState();
    const [allUsers, setAllUsers] = useState();
    const [socketID, setSocketID] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const SOCKET_URL = process.env.REACT_APP_CHAT_URL;
    const senderID = user.id;
    const name = user.name;
    
    
    async function getUsers(){
        try {
            const response = await axios.get(`${apiUrl}users`);
            if(response.data.status){
                SetLoading(false);
                setAllUsers(response.data.data);
            }
        } catch (error) {
            SetLoading(false);
            console.log("my error is "+ error.message);
        }
    }
        
    const socket = io(SOCKET_URL, { autoConnect: false});
    const socketConnect = async (id) => {
        // if(id){
            socket.auth = await { name, senderID, receiverID:id };
            await socket.connect();
            console.log(socket)
            setSocketID(socket.id)
            console.log("connected")
        // }
    }
    useEffect(()=>{
        socketConnect();
        getUsers();
    }, [])
    
    // Send user typed message
    const onChangeSetMessage = (event) => {
        setMessage(event.target.value);
    }
    
    // Send message to the server
    const sendMessage = () => {
        setMessageList(messageList => [...messageList, {message, name:"Raghu",msgTime:getTime(), position:'right'}]);
        let msgObj = {
            'sender_id': senderID,
            'receiver_id': selectedUserID,
            'type': 'message',
            'message' : message,
            }
        socket.emit("sendChatToServer", msgObj);
        setMessage('')
    }

    // Press enter send message
    const onMessageKeyPress = (e) =>{
        if(e.key==="Enter"){
            sendMessage();
        }
    }
  
    // Received message from server.
    socket.on("sendChatToClient", (data) => {
        console.log("receive data")
        console.log(data);
        var msgTime = moment(data.createdAt).format('h:mm a');
        setMessageList(messageList => [...messageList, {message:data.message, name:data.sender_name,msgTime:msgTime, position:'left'}]);
    });
    
    // Get live users list
    socket.on("liveUsers", (data) => {
        console.log("Live user list")
        console.log(data);
    });

    const getTime = () => {
        return moment().format('h:mm a');
    }

    const setUserID = (id) => {
        setSelectedUserID(id);
        // socketConnect(id)
    }

    if(loading){
        return(<Loader />);
    }
    return (
        <>
            <Container>
                <h4 className='text-center mt-4 mb-4'>Chat</h4>
                <Row>
                    <Col md={4}>
                        {selectedUserID}
                    <ListGroup> 
                        {allUsers && allUsers.map(user => {
                            return (
                                <>
                                    <ListGroup.Item onClick={()=>setUserID(user.id)} className={user.id===selectedUserID ? 'active': ''} key={user.userID}>{user.name}</ListGroup.Item>
                                </>
                            )
                        })}
                    </ListGroup>
                    </Col>
                    <Col md={8}>
                        <section className="p-1">
                            {messageList && messageList.length>0
                                ? messageList.map(msg => {
                                    return (
                                            <>
                                                <Messagebody data={msg} />
                                            </>
                                        )
                                }) : ''
                            }
                        </section>
                        <section className="border p-4 shadow rounded">
                        <Row>
                                <Col md={10}>
                                    Loggedin User id : {senderID} <br/>
                                    receiver_id : {selectedUserID}     <br/>                      
                                    socket Token: {socketID}
                                    <Form.Group>
                                        <Form.Control name ="message" value={message} type="text" placeholder="Enter message" onChange={(e)=>onChangeSetMessage(e)} onKeyPress={(e) => onMessageKeyPress(e)}></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Button variant="primary" disabled={message.length<1} onClick={sendMessage} type="submit" >Send</Button>
                                    </Form.Group>
                                </Col>
                             
                        </Row>
                        </section>  
                        
                    </Col>
                </Row>

                {/* <Button onClick={()=>dispatch({type:"INCREMENT"})} className="btn btn-primary">+</Button>
                <input type="text" value={state} />
                <Button onClick={()=>dispatch({type:"DECREMENT"})} className="btn btn-primary">-</Button> */}
            </Container>
        </>
    );
}  