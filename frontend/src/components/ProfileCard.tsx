import { User } from '../services/ChatService'

interface ProfileCardProps {
    user : User
    setSelectedProfile ?: React.Dispatch<React.SetStateAction<User | null>>
}

const ProfileCard = ({user, setSelectedProfile} : ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center w-6/12 h-full">
        <div className="flex flex-col mt-4 bg-gray-700 p-4 rounded-lg">
            <div className='flex flex-row items-start red-300 rounded-md'>
                {setSelectedProfile && 
                <button className="bg-red-500 rounded-full p-2 px-4 hover:cursor-pointer"
                    onClick={() => { setSelectedProfile(null)}}
                >
                    X
                </button>}
            </div>
            <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl text-white">Profile</h1>
                <div className="flex flex-col items-center justify-center gap-5 w-full mt-4">
                    <div>
                        <img src={user?.photo} alt="profile picture" className="w-32 h-32 rounded-full" />
                    </div>
                    <form className='flex flex-col items-center justify-center w-9/12'>
                        <div>
                            <label className='text-white'>
                                Username :
                            </label>    
                            <input
                                readOnly
                                className="m-2 px-4 py-2 w-fit bg-slate-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-100 placeholder-white cursor-not-allowed"
                                type={"text"}
                                placeholder={"Username"}
                                id='name'
                                value={user?.name || ''}
                            />
                        </div>
                        <div>
                            <label className='text-white'>
                                Email :
                            </label>                             
                            <input
                                readOnly
                                className="m-2 px-4 py-2 w-fit bg-slate-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-100 placeholder-white cursor-not-allowed"
                                type={"text"}
                                placeholder={"Email"}
                                id='email'
                                value={user?.email || ''}
                            />
                        </div>
                        {user?.createdAt && 
                            <div>
                                <label className='text-white'>
                                    Join date :
                                </label>                             
                                <input
                                    readOnly
                                    className="m-2 px-4 py-2 w-fit bg-slate-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-100 placeholder-white cursor-not-allowed"
                                    type={"text"}
                                    placeholder={"Date"}
                                    id='date'
                                    value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : ''}
                                />
                            </div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard