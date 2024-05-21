import { Message } from "../services/ChatService"

const MessageBox = ({user, content, created_at}: Message) => {
  return (
    <div className='flex flex-row justify-start items-center gap-2 h-fit m-2'>
        <div>
            {user.name}:
        </div>
        <div className='relative p-2 bg-gray-600 rounded-lg group'>
          {content}
          <div className='absolute top-full left-0 mt-2 p-1 bg-blue-400 text-black text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            {new Date(created_at).toLocaleString()}
          </div>
        </div>
    </div>
  )
}

export default MessageBox