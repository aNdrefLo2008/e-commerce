import React from 'react'
import Link from 'next/link';
import { addToShoppingCart, removeFromShoppingCart } from '../services';
import getStripe from '../services/getStripe'
import toast from 'react-hot-toast';

function Product({ product, buttonText, textLink, productPage = false, shoppingCartPage = false}) {

    const addToCart = async function() {
      const newData = await addToShoppingCart(product.slug);
      return newData;
    }

    const removeFromCart = async function() {
      const newData = await removeFromShoppingCart(product.slug);
      return newData;
    }


    const handleCheckout = async () => {
      const stripe = await getStripe();
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify([product]),
        });

      if(response.statusCode === 500) return;
      
      const data = await response.json();

      toast.loading('Redirecting...');

      stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='flex flex-col'>
        <div className='px-4 flex lg:flex-row flex-col items-center'>
          <div className='text-center md:mr-8 mb-12'>
            {productPage ? <div className='flex justify-center gap-14'>
                <h1 className="text-5xl font-semibold mt-0 mb-6">{product.title}</h1>
                <span className='text-2xl font-bold mt-3 mb-6'>${product.price}</span>
            </div> 
                :
            <h1 className="text-5xl font-semibold mt-0 mb-6">{product.title}</h1>
            }
            <p className='text-xl font-semibold max-w-lg'>{product.productDescription}</p>
            <div className='m-8 flex gap-10 items-center justify-center'>
              {!productPage && <div>
                {!shoppingCartPage ? <Link href={`/product/${textLink}`}>
                <button className="px-6 py-2.5 bg-white rounded-3xl text-gray-800 border-black border-2 font-medium text-xs leading-tight shadow-md hover:bg-black hover:text-white transition duration-500 ease-in-out">
                  {buttonText}
                </button>
                </Link > :
                <button onClick={() => removeFromCart()} className="px-6 py-2.5 bg-white rounded-3xl text-gray-800 border-black border-2 font-medium text-xs leading-tight shadow-md hover:bg-black hover:text-white transition duration-500 ease-in-out">
                  {buttonText}
                </button>
                }
              </div>}
              {productPage && !shoppingCartPage &&
                <button onClick={handleCheckout} className="px-6 py-2.5 bg-white rounded-3xl text-gray-800 border-black border-2 font-medium text-xs leading-tight shadow-md hover:bg-black hover:text-white transition duration-500 ease-in-out">
                  {buttonText}
                </button>
              }
              {!shoppingCartPage ? <button onClick={() => addToCart()} className="px-6 py-2.5 bg-white rounded-3xl text-gray-800 border-black border-2 font-medium text-xs leading-tight shadow-md hover:bg-black hover:text-white transition duration-500 ease-in-out">
                  Add to Cart
                </button> : 
                <button onClick={handleCheckout} className="px-6 py-2.5 bg-white rounded-3xl text-gray-800 border-black border-2 font-semibold text-xs leading-tight shadow-md hover:bg-black hover:text-white transition duration-500 ease-in-out">
                Buy Now
                </button>}
            </div>
          </div>
          <img src={product.productImage.url} alt={product.imageAlt} className="md:w-[450px] w-[350px] h-auto"/>
        </div>
        {productPage && !shoppingCartPage && <div className='flex lg:flex-row flex-col items-center py-20'>
          <div className='text-center md:mr-8 mb-12'>
            <h1 className="text-5xl font-semibold mt-0 mb-6">Details and Features</h1>
            <p className='text-xl font-semibold max-w-lg'>{productPage && product.details}</p>
          </div>
          <img src={product.featuresImage.url} className="rounded md:w-[650px] w-[550px] h-auto"/>
        </div>}
    </div>
  )
}

export default Product