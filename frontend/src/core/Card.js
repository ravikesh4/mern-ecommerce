import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage';
import moment from 'moment'

const Card = ({product, showViewProductButton = true}) => {

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <button className="btn btn-outline-primary mt-2 mr-2 mb-2">
                    View Product
                </button>
            )
        )
    }

    const showAddToCartButton = () => {
        return <button className="btn btn-outline-warning mt-2 mb-2">
        Add to cart
    </button>
    }

    const showStock = (quantity) => {
        return quantity > 0 
        ? (<span className="badge badge-primary badge-pill">In Stock</span>) 
        : (<span className="badge badge-warning badge-pill">Out of stock</span>)
    }

    return (
        // <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    <p className="lead mt-2">{product.description == null ? 'No Description' : product.description.substring(0,40)}...</p>
                    <p className="black-10">₹ {product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added On: {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)} <br />
                    <Link to={`/product/${product._id}`}>
                        {showViewButton(showViewProductButton)}
                    </Link>
                    {showAddToCartButton()}
                </div>
            </div>
        // </div>
    )
} 


export default Card;