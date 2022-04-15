export default function cartReducer(state, action){

    if(action.type==="addItem"){
        return {
            ...state, 
            item:[...state.item, action.payload]
        };

    }

    if(action.type==="updateItem"){
        console.log("update item")
    }
    
    if(action.type==="deleteItem"){
        console.log("delete item")
    }

    return state;

}