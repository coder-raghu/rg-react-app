import { io } from "socket.io-client";

const URL = "192.168.1.30:5000";

const socket = io(URL, { autoConnect: false });
    
export default socket