import { useEffect, useRef, useState } from "react";
import { Chat } from "../services/ChatService";
import MessageBox from "./Message";

interface ChatBoxProps {
    chat: Chat | null
}

const ChatBox = ({chat}: ChatBoxProps) => {
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [messageInput, setMessageInput] = useState<string>('');


    useEffect(() => {
        // Scroll to the bottom of the chat box when component mounts or chat updates
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chat]);

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-between gap-5 p-2 border-b">
                <div className="flex justify-center items-center orange_gradient">{chat?.name}</div>
                <div className="w-12">
                    <img src={chat?.photo} alt="chat img" />
                </div>
            </div>
            <div ref={chatBoxRef} className="ml-2 flex flex-col-reverse border-b h-[500px] overflow-auto">
                <div className="max-h-[500px]">
                    {
                        chat?.messages.map((message, index) => (
                            <MessageBox key={index} user={message.user} content={message.content} />
                        ))
                    }
                </div>
            </div>
            <div className="p-2 my-2 flex flex-row justify-between gap-5 rounded-lg">
                <input type="text" placeholder="Type a message" className="w-full rounded-lg p-2 text-slate-700" 
                    onChange={(e) => setMessageInput(e.target.value)} 
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {console.log(messageInput)}}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatBox;