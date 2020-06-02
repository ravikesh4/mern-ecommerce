import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProduct} from './apiCore'
import Card from './Card';


const Home = () => {
    const [productsBySell, setProductBySell] = useState([]);
    const [productsByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false)


    const loadProductBySell = () => {
        getProduct('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProduct('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, [])

    return (<Layout title="Home Page" description="Node React app" className="container">

            <h2 className="mb-4">New Arrival</h2>        
            <div className="row">
            {productsByArrival.map((product, i) => (
                <Card key={i} product={product} />
                ))}
                </div>       
                <h2 className="mb-4">Best Sellers</h2> 
            <div className="row">
            {productsBySell.map((product, i) => (
                <Card key={i} product={product} />
            ))}
            </div>

            
    </Layout> 
    )
}

export default Home;