import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Image, Pagination } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useUserContext } from "../../context/userContext";
import Loader from "../../global/Loader";
import { FaPencilAlt,FaTrashAlt } from "react-icons/fa";
import DataTable from 'react-data-table-component';

export default function Products(){

    const [loading, SetLoading] = useState(true);
    const [products, setProducts] = useState();
    const [deleted, setdeleted] = useState(true);
    const [totalProducts, setTotalProducts] = useState();
    const { user } = useUserContext(); 
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function getProducts(){
            const response = await axios.get(`${apiUrl}products`); 
            if(response.data.status===true){
                setProducts(response.data.data);
                setTotalProducts(response.data.other.totalRecord);
                SetLoading(false);   
            }
        }
        getProducts();
    }, [deleted, apiUrl]);

    if(loading){
        return(<Loader />);
    }

    if(!user.isLoggedIn){
        navigate('/login');
    }

    const willDelete = (id) =>{
        setdeleted(true)
        swal({
            title: "Are you sure?",
            text: "You want to delete this product?",
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    closeModal: true
                }
            }
        }).then((value) => {
            if(value){
                axios.post(`${apiUrl}products/delete`, {id:id})
                .then(response => {
                    if(response.data.status === true){
                        setdeleted(false)
                        swal("Deleted!", "Your product has been deleted!", "success");
                    }
                });
            }
        });
    }

    const columns = [
        {
            name: 'Image',
            selector: row => {
                let imageUrl = '';
                if(row.image){
                    imageUrl = apiUrl + row.image;
                } else {
                    imageUrl = apiUrl + 'uploads/default.png';
                }
                return <Image width="60" thumbnail="true" src={imageUrl}></Image>
            },
        },
        {
            name: 'Title',
            selector: row => {
                const view = `/productDetails/${row.id}`;
                return <NavLink to={view}>{row.title}</NavLink>
            },
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Quantity',
            selector: row => row.qty,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => {
                const edit = `/manage/${row.id}`;
                return(
                    <>
                    <Button className="me-2" size="sm" onClick={() => willDelete(row.id)}><FaTrashAlt /></Button>
                    <NavLink to={edit}><    Button className="me-2" size="sm"><FaPencilAlt /></Button></NavLink>
                    </>
                )
            }
        },
    ];

    return(
        <>
        <Container>
            <NavLink to="/manage"><Button className="float-end mb-1">Add new</Button></NavLink>
            <h4 className='text-center mt-4 mb-4'>Products Listing</h4>
            <DataTable
                // title="Products Listing"
                columns={columns}
                data={products}
                pagination
            />
            {/* <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => {
                        const view = `/productDetails/${product.id}`;
                        const edit = `/manage/${product.id}`;
                        var imageName = '';
                        if(product.image){
                            imageName = apiUrl + product.image;
                        } else {
                            imageName = apiUrl + 'uploads/default.png';
                        }
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td className="text-center"><Image centered="true" width="60" thumbnail="true" src={imageName}></Image></td>
                                <td><NavLink to={view}>{product.title}</NavLink></td>
                                <td>{product.price}</td>
                                <td>{product.qty}</td>
                                <td>{product.status ? ( <p className="text-success">Active</p>) : (<p className="text-danger"><i className="">Deactive</i></p>) }</td>
                                <td>
                                    <Button className="me-2" size="sm" onClick={() => willDelete(product.id)}><FaTrashAlt /></Button>
                                    <NavLink to={edit}><Button className="me-2" size="sm"><FaPencilAlt /></Button></NavLink>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> */}
        </Container>
        </>
    )

}


