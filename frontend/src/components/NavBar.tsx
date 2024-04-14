import React from 'react'

const NavBar: React.FC = () => {
  return (
    <nav>
        <div className='flex flex-row justify-between items-center py-4'>
            <div className='mx-6'>
                <a href="/">
                    <img src='/valorant.png' alt='logo' className='w-14' />
                </a>
            </div>
            
            <div className='mx-6'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Register
                </button>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
