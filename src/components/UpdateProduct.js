import React,{useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom"; //used to import the params from url on page load

const UpdateProduct = () =>{
    const [name, setName] = useState("");
    const [priceInRs, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    })

    const getProductDetails = async() => {
        let result = await fetch(`http://localhost:5000/product/${params._id}`,{
            headers : {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.priceInRs);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct=async()=>{
        console.log(name,priceInRs,category,company);

        if(!name || !priceInRs || !category || !company)
        {
            setError(true)
            return false;
        }

        await fetch(`http://localhost:5000/product/${params._id}`,{
            method:'put',
            body: JSON.stringify({name,priceInRs,category,company}),
            headers:{
                'Content-Type' : 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        navigate('/');
    }

    return(
        <div className="product">
            <h1>Update Product</h1>
            
            <input className="inputbox" type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />
            {error && !name && <span className="invalid-input">Enter valid product name!</span>}
            
            <input className="inputbox" type="number"
                value={priceInRs} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
            {error && !priceInRs && <span className="invalid-input">Enter valid price for product!</span>}
            
            <input className="inputbox" type="text"
                value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category" />
            { error && !category && <span className="invalid-input">Enter valid category the product! </span>}
            
            <input className="inputbox" type="text"
                value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Company" />
            { error && !company && <span className="invalid-input">Enter valid company!</span>}

            <button className="appbutton" type="button" onClick={updateProduct}>Update Product</button>
        </div>

    )
}

export default UpdateProduct;