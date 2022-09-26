import React, { useState, useEffect } from 'react'
import Product from './Product';
import { getProducts } from '../services'

function Products() {
  const [products, setProducts] = useState([]);
    
    useEffect(() => {
      getProducts()
        .then(newProducts => setProducts(newProducts))
    }, [])
    
  return (
    <div className="bg-white mt-20 flex flex-col justify-center w-full items-center gap-40">
      {products.map(product => (
        <div key={product.id}>
          <Product product={product} textLink={product.slug} buttonText="Learn More"/>
        </div>
        
      ))}
    </div>
  )
}

export default Products