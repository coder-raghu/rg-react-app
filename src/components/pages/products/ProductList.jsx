import axios from "axios";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";



export default function ProductList(data){
    const {id, title, price, qty} = data.data;
    let navigate = useNavigate();

    const willDelete = (id) =>{
        swal({
            title: "Are you sure?",
            text: "you want to delete this product?",
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        }).then((value) => {
            if(value){
                axios.post('http://127.0.0.1:8000/api/delete', {id:id})
                .then(response => {
                    if(response.status === 200){
                        swal("Deleted!", "Your product has been deleted!", "success");
                        navigate('/products');
                    }
                });
            }
        });
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
                    <Button className="me-2" onClick={() => willDelete(id)}>Delete</Button>
                    <NavLink to={edit}><Button className="me-2" >Edit</Button></NavLink>
                </td>
            </tr>
        </>
    );
}
