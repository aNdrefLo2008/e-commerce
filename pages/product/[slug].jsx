import React from 'react'
import Navbar from '../../components/NavBar'
import Product from '../../components/Product'
import { getProducts } from '../../services'


function ProductPage({ product }) {
    return (
      <div>
        <Navbar />
        <div className='flex justify-center items-center py-20'>
          <Product key={product.id} buttonText='Buy Now' product={product} productPage={true}/>
        </div>
      </div>
    )
    
}

export async function getStaticProps({ params }) {

  const products = await getProducts(); 

  const product = products.find(el => el.slug === params.slug)

  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  const products = await getProducts(); 

  return {
    paths: products.map(({ slug }) => ({ params: { slug } })),
    fallback: false
  }
}

export default ProductPage