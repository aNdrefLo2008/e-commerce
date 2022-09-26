import React from 'react'
import Product from '../../components/Product'
import NavBar from '../../components/NavBar';
import { GetCategories } from '../../services';


function CategoryPage({ category  }) {
  
  return (
    <div className=''>
        <NavBar />
        
        <div className="bg-white mt-20 flex flex-col justify-center w-full items-center gap-40">
          {category.products.map(product => (
            <Product key={product.id} product={product} textLink={product.slug} buttonText="Learn More"/>
          ))}
        </div>
    </div>
  )
}

export async function getStaticProps({ params }) {

  const categories = await GetCategories(); 

  const category = categories.find(el => el.slug === params.slug)

  return {
    props: {
      category
    }
  }
}

export async function getStaticPaths() {
  const products = await GetCategories(); 

  return {
    paths: products.map(({ slug }) => ({ params: { slug } })),
    fallback: false
  }
}

export default CategoryPage