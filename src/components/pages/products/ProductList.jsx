import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert/dist/components/SweetAlert";


export default function ProductList(data){
    const {id, title, price, qty} = data.data;

    const deleteRecord = (id) =>{
            return (
                <>
                    <SweetAlert
                        custom
                        showCancel
                        showCloseButton
                        confirmBtnText="Yes"
                        cancelBtnText="No"
                        confirmBtnBsStyle="primary"
                        cancelBtnBsStyle="light"
                        customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
                        title="Do you like thumbs?"
                        onConfirm={() => onConfirm()}
                        onCancel={() =>onCancel()}
                        >
                        You will find they are up!
                    </SweetAlert>
                </>
            )
    }
    
    const onConfirm = () => {
        alert('click');
    }
    
    const onCancel = () => {
        return true
    }

    const view = `/productDetails/${id}`;
    const edit = `/manage/${id}`;
    return(
        <>
            <tr key={id}>
                <td>{id}</td>
                <td><NavLink to={view}>{title}</NavLink></td>
                <td>{price}</td>
                <td>{qty}</td>
                <td>
                    <Button className="me-2" onClick={() => deleteRecord(id)}>Delete</Button>
                    <NavLink to={edit}><Button className="me-2" >Edit</Button></NavLink>
                </td>
            </tr>
        </>
    );
}
