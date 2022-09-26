import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ecommerceLogo from '../public/e-commerce.png'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { GetCategories, getProducts } from '../services'
import Link from 'next/link'

function NavBar() {
  const [ icon, setIcon ] = useState(true)
  const [ searchBar, setSearchBar ] = useState(false)
  const [ searchBarArrays, setSearchBarArrays ] = useState(false)
  const [ searchBarInput, setSearchBarInput ] = useState('')
  const [categories, setCategories] = useState([]);
  const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
  const [searchBarProductsValue, setSearchBarProductsValue] = useState([])

  const handleChange = e => {
    setSearchBarInput(e.target.value);
  };

    useEffect(() => {
      GetCategories()
        .then(newCategories => setCategories(newCategories))

      getProducts()
        .then(newProducts => {
          const productInShoppingCart = newProducts.filter(product => product.isInTheShoppingCart === true);
          setShoppingCartProducts(productInShoppingCart)
        })
    }, [])


  return (
    <div>
      <div className='flex flex-col'>
        <div className='bg-black text-[#FBF8FF] text-center font-medium py-2 px-4'>
        Get free delivery on orders over $100
      </div>
      <div className='flex flex-row justify-between px-4 border-b text-[#1D1A27]'>
        {icon ? <Bars3Icon width="25px" className='sm:hidden block cursor-pointer' onClick={() => {
          setIcon(prev => !prev)
        }}/> : 
        <XMarkIcon width="30px" className='sm:hidden block cursor-pointer' onClick={() => {
          setIcon(prev => !prev)
        }}/>}
          
        <Image src={ecommerceLogo} width="80px" height="80px" className='cursor-pointer w-[80px] h-[80px]'/>

        <ul className='sm:flex sm:gap-6 hidden mt-6 cursor-pointer'>
          {categories.map(category => (
            <li key={category.id}>
              <Link href={`/category/${category.slug}`}>{category.categoryTitle}</Link>
            </li>
          ))}
        </ul>
        <div className='flex'>
          {searchBar && <div className='flex gap-4'>
              <svg
                onClick={async () => {
                  setSearchBarArrays(false)
                  setSearchBarProductsValue([])
                  const newProducts = await getProducts()
                  const searchBarProducts = newProducts.filter(product => searchBarInput === product.title)
                  setSearchBarProductsValue(searchBarProducts)
                  setSearchBarArrays(true)
                }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 text-gray-400 hover:text-gray-600 mt-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input type="text"
                onChange={handleChange} value={searchBarInput} 
                className="
                  form-control
                  block
                  w-full
                  my-4
                  mt-4
                  px-2
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                placeholder="Search Product..."/>
              <XMarkIcon onClick={() => {
                setSearchBar(!searchBar)
                setSearchBarArrays(false)
                setSearchBarProductsValue([])
                setSearchBarInput('')
              }} className='w-8 h-8 text-gray-400 hover:text-gray-600 mt-6 cursor-pointer' />
            </div>
            }
          {!searchBar && <div className='mt-6 cursor-pointer' onClick={() => setSearchBar(!searchBar)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>}
          <Link href='/shopping-cart'>
            <div className='flex items-center ml-8 -mt-2 cursor-pointer'>
                <svg className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{shoppingCartProducts.length}</span>
            </div>
          </Link>
          
          
          </div>
        </div>
      </div>

      <div>
        <div className={`${!icon ? 'flex' : 'hidden'} sm:hidden justify-center items-center flex-col p-6 bg-gray-100 absolute top-36 left-0 mx-2  min-w-[140px] rounded-xl sidebar`}>
            <ul className='list-none flex justify-end items-center flex-1 flex-col'>
              {categories.map((category) => (
                <li key={category.id} className={`font-medium cursor-pointer text-[18px] hover:text-blue-600 mr-0 mb-4`}>
                    <Link href={`/category/${category.slug}`}>{category.categoryTitle}</Link>
                  </li>
              ))}
            </ul>
          </div> 
      
      </div>


      <div>
        {searchBar && searchBarArrays && <div className='bg-white hover:bg-gray-200 cursor-pointer'>
            {searchBarProductsValue.map(product => (
              <Link href={`/product/${product.slug}`} key={product.id}>
                <div className='py-8 w-full flex justify-around items-center'>
                  <div>
                    <img className='rounded w-[120px] mt-6 ml-4' src={product.productImage.url}/>
                  </div>
                  <div>
                    <div className='flex justify-between'>
                      <h1 className='text-3xl font-bold mt-0 mb-6'>{product.title}</h1>
                      <h2 className='mr-20 text-2xl font-bold'>${product.price}</h2>
                    </div>
                    <p className='text-base font-semibold max-w-lg'>{product.productDescription}</p>
                  </div>
                </div>
            </Link>
            ))}
            
          </div>}
      </div>
    </div>
  )
}

export default NavBar