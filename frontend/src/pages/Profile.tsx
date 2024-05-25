import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { User } from '../services/AuthService'
import ProfileCard from '../components/ProfileCard'

const Profile = () => {
    const {user: userString} = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (!userString) {
            console.log('no user')
            navigate('/')
        }else {
            const user : User = JSON.parse(userString)
            setUser(user)
        }
    }, [])


  return (
    <div className={`flex flex-col items-center bg-gray-800 h-screen`}>
            <div className="w-screen">
                <NavBar />
            </div>
            <ProfileCard user={user!} />
    </div>
  )
}

export default Profile