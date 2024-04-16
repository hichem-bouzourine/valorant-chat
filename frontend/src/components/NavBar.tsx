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
                    <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded'> 
                        Logout
                    </button>  
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
