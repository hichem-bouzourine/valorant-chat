import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { Match } from "../services/MatchService"
import MatchElement from "../components/MatchElement"
import { getMatchs } from "../services/MatchService"
import { Chat, getChat } from "../services/ChatService"
import ChatBox from "../components/ChatBox"
// import useWebSocket from "../services/WebSocketService"
import { useWebSocket } from "../context/WebSocketProvider"

const Matchs = () => {
    const {user} = useAuth()
    const {socket, socketIsOpen, error, sendEvent} = useWebSocket()
    const [matchs, setMatchs] = useState<Match[]>([])
    const [chat, setChat] = useState<Chat | null>(null)
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

    const onClickMatch = (chatId : string, match : Match) => {
        getChat({chatId, setChat})
        setSelectedMatch(match)
        console.log(socketIsOpen)
        if (socket && socketIsOpen ) {
            // Subscribe to the chat using the sendEvent function
            sendEvent("subscribe", { chat_id: chatId });
        }
    }

    useEffect(() => {
        if (!user) {
            Navigate({to: '/'})
        }
    }, [])

    useEffect(() => {
        getMatchs({setMatchs})
    }, [])


    return (
        <div className="flex flex-col items-center bg-gray-800 h-screen">
            <div className="w-screen">
                <NavBar />
            </div>
            <div className="orange_gradient text-5xl mb-8">
                Select a match and join the discussion
            </div>
            <div className="w-5/6">
                <div className="flex flex-row gap-4">
                    <div className="w-4/12 text-white border border-gray-500 rounded-lg max-h-[650px]">
                        <ChatBox chat={chat} socket={socket} socketIsOpen sendEvent={user ? sendEvent: null} error={error}/>
                    </div>
                
                    <div className="overflow-auto max-h-[800px] w-8/12">
                        <div className="flex flex-col justify-center items-center gap-2 ">
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