import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { io } from "socket.io-client";
import { useUserContext } from "../../context/userContext";
import Messagebody from "./messageBody";
// import socket from "../../../config/socket";

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
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    // const [liveUsers, setLiveUsers] = useState([]);
    const [userSocket, setUserSocket] = useState();
    const senderID = user.id;
    // const username = user.name;
    const receiverID = 15;
    
    const socket = io("192.168.1.30:5000",{ autoConnect: false });
    
    socket.on("connect", (socket) => {
        console.log("Connected")
        // setUserSocket(socket)
    });
    // console.log(username)

    useEffect(()=>{
        // const socketConnect = () => {
        //     socket.auth =  { name:username, userID:senderID } ;
        //     socket.connect();
        //     // console.log(socket.id)
        //     console.log("connected")
        // }
        // socketConnect();
    })
    
   
    // Send user typed message
    const onChangeSetMessage = (event) => {
        setMessage(event.target.value);
    }
    
    // Send message to the server
    const sendMessage = async () => {
        setMessageList(messageList => [...messageList, {message, name:"Raghu",msgTime:getTime(), position:'right'}]);
        let msgObj = {
            'sender_id': senderID,
            'receiver_id': receiverID,
            'type': 'message',
            'message' : message,
            }
        await socket.emit("sendChatToServer", msgObj);
        setMessage('')
    }

    // Press enter send message
    const onMessageKeyPress = (e) =>{
        if(e.key==="Enter"){
            sendMessage();
        }
    }
    
        // socket.on("liveUsers", (data) => {
    //     setLiveUsers(users => [...users, data])
    // });
    

    // Received message from server.
    socket.on("sendChatToClient", (data) => {
        var msgTime = moment(data.createdAt).format('h:mm a');
        setMessageList(messageList => [...messageList, {message:data.message, name:data.sender_name,msgTime:msgTime, position:'left'}]);
    });

    const getTime = () => {
        return moment().format('h:mm a');
    }
    return (
        <>
            <Container>
                <h4 className='text-center mt-4 mb-4'>Chat</h4>
                <Row>
                    <Col md={4}>
                    <ListGroup>
                        {/* {liveUsers.length>=0 && liveUsers.forEach(element => {
                            <ListGroup.Item>{element.info.name}</ListGroup.Item>
                        })} */}

                        <ListGroup.Item>John Doe</ListGroup.Item>
                        <ListGroup.Item>John Doe</ListGroup.Item>
                        <ListGroup.Item>John Doe</ListGroup.Item>
                        <ListGroup.Item>John Doe</ListGroup.Item>
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
                            {userSocket}
                            <Col md={10}>                            
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