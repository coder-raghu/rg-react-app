import { ListGroup } from "react-bootstrap";


const messageBody = (data) => {
   
    const {message, name, position, msgTime}  = data.data;
    console.log(message)
    function makeid(length) {
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
        {/* <li>{data.data.name} - {data.data.message} - {data.data.position}</li> */}
        {position == 'left' ? 
            (<p skey={makeid(10)} className="p-2 mb-2 border shadow">
                {message}-<small>{msgTime}</small>
            </p>) 
            : (<p skey={makeid(10)} className="text-end p-2 mb-2 border shadow">
                {message}-<small>{msgTime}</small>
                </p>)
         }
        
        </>
    )
}

export default messageBody;