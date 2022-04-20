import Select from 'react-select';
import axios from "axios";
import React, { useState, useEffect } from "react"
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../../global/Loader";
import { useUserContext } from '../../context/userContext';


const AddEdit = () => {


    let {id} = useParams();
    const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm();
    const [loading, SetLoading] = useState(true);
    const [radioChecked, setRadioChecked] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const { token, user } = useUserContext();
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const options = [
        { 'value': '1', 'label': 'Cloth' },
        { 'value': '2', 'label': 'Mobile' },
        { 'value': '3', 'label': 'Books' },
    ];

    useEffect(() => {
        const products = async () =>{
            await axios.post(`${apiUrl}products/show`, {id})
            .then((response) => {
                if(response.data.status === true){
                    const dataObj = response.data.data;
                    setValue('title', dataObj.title)
                    setValue('price', dataObj.price)
                    setValue('quantity', dataObj.qty)
                    setValue('description', dataObj.description)
                    setValue('image', dataObj.image)
                    setValue('category', dataObj.category)
                    setValue('status', dataObj.status)
                    setSelectedOption(dataObj.category)
                    setRadioChecked(dataObj.status)
                    SetLoading(false);   
                }
            });       
        }
        if(id)
            products();
        else
            SetLoading(false);

    }, [])

    const onSubmit = (data) =>{
       console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('status', data.status);
        
        let axiosConfig = {
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "x-access-token" : `${token}`
            }
        };

        var requestUrl = `${apiUrl}products/store`;
        if(id){
            formData.append('id', id);
            // data.id = id;
            requestUrl = `${apiUrl}products/update`;
        }
    
        axios.post(requestUrl, formData, axiosConfig)
        .then(response => {
            if(response.status === 200){
                if(id){
                    swal("Updated!", "Product Updated", "success");
                } else {
                    swal("Added!", "Product Added", "success");
                }
                navigate('/products');
                reset();
            }
        });
    } 

    if(loading){
        return(<Loader />);
    }

    const error = {
        color: "red",
    }

    var imageName = getValues('image');
    if(imageName || imageName==="undefined"){
        imageName = apiUrl + getValues('image');
    } else {
        imageName = apiUrl + 'uploads/default.png';
    }

    const changeOption = (e) =>{
        setSelectedOption(e.value)
        setValue('category', e.value)
    }

    return(
        <>
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control {...register("title", { required: true, minLength: 3 })} type="name" placeholder="Enter product name"></Form.Control>
                            <p style={error}>
                            {errors.title?.type === 'required' && "Product title is required"}
                            {errors.title?.type === 'minLength' && "Please enter more than 3 character"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Price</Form.Label>
                            <Form.Control {...register("price", { required: true,  pattern: /^\d{0,4}(\.\d{0,2})?$/i  })  } type="text"  placeholder="Enter price" ></Form.Control>
                            <p style={error}>
                            {errors.price?.type === 'required' && "price is required"}
                            {errors.price?.type === 'pattern' && "Enter valid price"}
                            </p>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="12">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control {...register("quantity", { required: true, pattern: /^[0-9]+$/i })  } type="text"  placeholder="Enter quantity" ></Form.Control>
                            <p style={error}>
                            {errors.quantity?.type === 'required' && "quantity is required"}
                            {errors.quantity?.type === 'pattern' && "Enter valid quantity"}
                            </p>
                        </Form.Group>


                        <Form.Group as={Col} md="12">
                            <Form.Label>Category</Form.Label>
                       
                            <Select 
                                {...register("category", { required: true })  }
                                options={options}
                                onChange={e => changeOption(e)}
                                defaultValue= { options.find(data=> {
                                    return data.value==selectedOption
                                }) }
                                placeholder="Please select category"
                            />
                            <p style={error}>
                                {errors.category?.type === 'required' && "Select category"}
                            </p>
                        </Form.Group>


                        <Form.Group as={Col} md="12">
                            <Form.Label>Status</Form.Label><br/>
                            <Form.Check
                                {...register("status")}
                                defaultChecked={ radioChecked===1 }
                                inline
                                label="Active"
                                name="status"
                                type="radio"
                                value="1"
                                id="inline-radio-1"
                            />
                            <Form.Check
                                defaultChecked={ radioChecked===0 }
                                {...register("status")}
                                inline
                                label="Deactive"
                                name="status"
                                type="radio"
                                value="0"
                                id="inline-radio-2"
                            />
                        </Form.Group>



                        <Form.Group as={Col} md="12">
                            <Form.Label>Description</Form.Label>
                            <Form.Control  {...register("description", {required:true, minLength: 10}) } as="textarea" name="description" rows="3"></Form.Control>
                            <p style={error}>
                            {errors.description?.type === 'required' && "description is required"}
                            {errors.description?.type === 'minLength' && "Please enter more than 10 character"}
                            </p>
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control  { ...register("image") }  type="file" />
                            <p style={error}>
                                {errors.image?.type === 'required' && "image is required"}
                            </p>
                        </Form.Group>
                        {/* <Image src={imageName} width="200"></Image> */}

                        <Form.Group as={Col} md="12">
                            <Button variant="primary" type="submit">Submit</Button>{' '}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default AddEdit;