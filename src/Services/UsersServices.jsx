import axios from "axios"

async function UsersServices(){

    // const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    // console.log(response);

}

async function getUsers(){
    // try{
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    //     console.log(response);
    //     if(response.status==200){
    //         return response.data;
    //     } else {
    //         return false;
    //     }
    // } catch(error){
    //     throw error;
    // }
    
}

function getUserDetailsByID(){

    return(
        <h1>User details</h1>
    )
}

export default {
    UsersServices,
    getUsers,
    getUserDetailsByID
}