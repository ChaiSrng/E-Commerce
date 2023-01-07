import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]); //defining a state of empty array

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        console.log(localStorage.getItem('token'));
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (_id) => {
        let result = await fetch('http://localhost:5000/deleteProduct', {
            method: "delete",
            body: JSON.stringify({ _id }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result)
            getProducts();
    }

    const searchHandle = async (event) => {
        //console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
            result = await result.json();
            if (result)
                setProducts(result)
        } else
            getProducts();
    }
    console.log("products", products);

    return (
        <div className="product-list">
            <h3>Products</h3>
            <input className="search-product-box" onChange={searchHandle} placeholder="Search" />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Category</li>
                <li>Operations</li>
            </ul>
            {
                products.length ? products.map((item, index) =>
                    <ul>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.priceInRs}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h3>No Products Found!</h3>
            }
        </div>
    )
}

export default ProductsList;