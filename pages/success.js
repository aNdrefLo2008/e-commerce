import React from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

const Success = () => {

  return (
    <div className="flex justify-center items-center py-20 text-5xl mt-40">
      <div className="flex justify-center items-center flex-col">
          <h2 className="font-bold text-[#324d67]">Thank you for your order!</h2>
          <p className="mt-6 text-green-500 font-normal">
            <BsBagCheckFill />
          </p>
        <Link href="/">
          <button type="button" className="mt-6 py-5 rounded-lg px-10 bg-green-500 text-white font-semibold">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success