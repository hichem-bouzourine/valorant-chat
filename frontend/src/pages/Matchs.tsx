import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { Match } from "../services/MatchService"
import MatchElement from "../components/MatchElement"
import { getMatchs } from "../services/MatchService"
import { Chat, getChat } from "../services/ChatService"
import ChatBox from "../components/ChatBox"
import { useWebSocket } from "../context/WebSocketProvider"
import { BallTriangle } from 'react-loader-spinner'


const Matchs = () => {
    const {user} = useAuth()
    const {socket, socketIsOpen, error, sendEvent} = useWebSocket()
    const [matchs, setMatchs] = useState<Match[]>([])
    const [chat, setChat] = useState<Chat | null>(null)
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
    const [loadingMatchs, setLoadingMatchs] = useState<boolean>(true)
    const [loadingChat, setLoadingChat] = useState<boolean>(false)
    const navigate = useNavigate()

    const onClickMatch = (chatId : string, match : Match) => {
        setLoadingChat(true)            
        getChat({chatId, setChat})
        setSelectedMatch(match)            
        console.log(socketIsOpen)
        if (socket && socketIsOpen ) {
            // Subscribe to the chat using the sendEvent function
            sendEvent("subscribe", { chat_id: chatId });
        }
        setLoadingChat(false)
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        getMatchs({setMatchs})
        setLoadingMatchs(false)
    }, [])

    return (
        <div className={`flex flex-col items-center bg-gray-800 ${chat ? "h-full" : "h-screen"} lg:h-screen`}>
            <div className="w-screen">
                <NavBar />
            </div>
            <div className="orange_gradient text-5xl mb-8 md:text-xl lg:text-4xl">
                Select a match and join the discussion
            </div>
            <div className="w-5/6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {loadingChat && (
                        <div className="flex justify-center items-center">
                            <BallTriangle color="#ffffff" height={50} width={50} />
                        </div>
                    )}
                    {chat  && (
                        <div className=" lg:w-4/12 text-white border border-gray-500 rounded-lg max-h-[650px]">
                            <ChatBox chat={chat} setChat={setChat}/>
                        </div>
                    )
                    }
                
                    <div className={`overflow-auto max-h-[800px] ${chat ? ` lg:w-8/12` : "w-full"}`}>
                        <div className="flex flex-col justify-center items-center gap-2 overflow-auto">
                            {loadingMatchs && (
                                <div className="flex justify-center items-center">
                                    <BallTriangle color="#ffffff" height={50} width={50} />
                                </div>
                            )}
                            {matchs.map((match, index) => (
                                <MatchElement match={match} key={index} onClickMatch={onClickMatch} selectedMatch={selectedMatch}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Matchs