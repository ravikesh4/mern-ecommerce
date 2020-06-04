import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {read, listRelated} from './apiCore'
import Card from './Card';

const Product = (props) => {

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error)
            } else{
                setProduct(data)
                // fetch related product 
                listRelated(data._id).then((data) => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout title={`${product.name}`} description={product.description == null ? 'No Description' : product.description.substring(0,40)} className="container">
            
            <h2 className="mb-4">{`${product.name}`}</h2>
            <div className="row">
                <div className="col-md-8">
                {product && product.description && <Card product={product} showViewProductButton={false} /> }
                </div>
                <div className="col-md-4">
                    <h4>Related Product</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
            
    </Layout> 
    )
}

export default Product;