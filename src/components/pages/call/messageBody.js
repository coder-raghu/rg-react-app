import { ListGroup } from "react-bootstrap";


const messageBody = (data) => {
   
    const {message, name, position, msgTime}  = data.data;
    function makeid(length=10) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *  charactersLength));
        }
       return result;
    }
    
    return(
        <>
        {position === 'left' ? 
            (<p skey={makeid()} className="p-2 mb-2 border shadow">
                {message}-<small>{msgTime}</small>
            </p>) 
            : (<p skey={makeid()} className="text-end p-2 mb-2 border shadow">
                {message}-<small>{msgTime}</small>
                </p>)
         }
        </>
    )
}

export default messageBody;