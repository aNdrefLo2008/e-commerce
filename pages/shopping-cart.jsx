import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Product from '../components/Product';
import getStripe from '../services/getStripe';
import { getProducts } from '../services';
import { toast } from 'react-hot-toast';

function Cart() {

    const [products, setProducts] = useState([]);
    
    const getShoppingCartProducts = async () => {
        const newProducts = await getProducts()

        const productsInShoppingCart = newProducts.filter(product => product.isInTheShoppingCart === true)
        setProducts(productsInShoppingCart)
    }

    useEffect(() => {getShoppingCartProducts()}, [])

    const handleCheckout = async () => {
        const stripe = await getStripe();
    
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(products),
        });
    
        if(response.statusCode === 500) return;
        
        const data = await response.json();
    
        toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id });
      }

    return (
        <div>
            <NavBar />
            {products.length > 0 ? <div className='flex flex-col items-center mt-10'>
                <h1 className='font-bold text-5xl '>Your Shopping Cart</h1>
                <button onClick={handleCheckout} className="mt-10 px-12 py-5 bg-white rounded-3xl text-gray-800 border-black border-2 font-bold text-xl leading-tight shadow-md hover:bg-black hover:text-white transition duration-500 ease-in-out">
                    Buy All Products Now
                </button>
                <div className='p-10 gap-20'>
                    {products.map(product => (
                        <div className='pt-20' key={product.id}>
                            <Product shoppingCartPage={true} product={product} buttonText='Remove From Cart'/>
                        </div>
                        
                    ))}
                </div>
            </div> : 
            <div className='mt-10 text-center'>
                <div className='max-w-lg text-xl'>
                    Sorry but you don't have any products. Add to you Cart 
                    <span className=' text-blue-500 hover:text-blue-700'>
                        <Link href='/'>
                            Right Here
                        </Link>
                    </span>
                </div>
            </div>}
        </div>
    )
}

export default Cart