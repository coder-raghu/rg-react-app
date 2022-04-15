import React, { useReducer } from "react";
import { Button, Container } from "react-bootstrap";


export default function Call() {

    const reducer = (state, action) => {
        if(action.type==="INCREMENT"){
            state = state + 1
        }

        if(action.type==="DECREMENT" && state>0){
            state = state - 1
        }

        return state;
    }
    
    var init = 0;
    const [state, dispatch] = useReducer(reducer , init)

    return (
        <>
            <Container>
                <Button onClick={()=>dispatch({type:"INCREMENT"})} className="btn btn-primary">+</Button>
                <input type="text" value={state} />
                <Button onClick={()=>dispatch({type:"DECREMENT"})} className="btn btn-primary">-</Button>
            </Container>
        </>
    );
}  