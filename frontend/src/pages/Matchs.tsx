import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { Match } from "../services/MatchService"
import MatchElement from "../components/MatchElement"
import { getMatchs } from "../services/MatchService"
import { Chat, getChat } from "../services/ChatService"
import ChatBox from "../components/ChatBox"

const Matchs = () => {
    const {user} = useAuth()
    const [matchs, setMatchs] = useState<Match[]>([])
    const [chat, setChat] = useState<Chat | null>(null)
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

    if (!user) {
        Navigate({to: '/'})
    }

    useEffect(() => {
        getMatchs({setMatchs})
    }, [])


    const onClickMatch = (chatId : string, match : Match) => {
        getChat({chatId, setChat})
        setSelectedMatch(match)
    }
    

    // !!!!! a regler, logout matchs

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
                        <ChatBox chat={chat} />
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