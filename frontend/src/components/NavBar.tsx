import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';

const NavBar: React.FC = () => {
    
    const { user, logout } = useAuth();

  return (
    <nav>
        <div className='flex flex-row justify-between items-center py-4'>
            <div className='mx-6'>
                <a href="/">
                    <img src='/valorant.png' alt='logo' className='w-14' />
                </a>
            </div>
            <div className='mx-6'>
                {user ? (
                    <>
                        <div className='flex flex-row gap-9'>
                            <img src={JSON.parse(user).photo} alt="profile picture" className='w-12 rounded-full' />
                            <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded'> 
                                Logout
                            </button>  
                        </div>
                    </>
                ) : (
                    <button>
                        <Link to='/login' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded'> 
                            Login
                        </Link>
                    </button>
                )
                }
            </div>
        </div>
    </nav>
  )
}

export default NavBar
