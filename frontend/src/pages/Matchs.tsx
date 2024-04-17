import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { Match } from "../services/MatchService"
import MatchElement from "../components/MatchElement"
import { getMatchs } from "../services/MatchService"


const Matchs = () => {
    const {user} = useAuth()
    const [matchs, setMatchs] = useState<Match[]>([])

    if (!user) {
        Navigate({to: '/'})
    }

    useEffect(() => {
        getMatchs({setMatchs})
    }, [])

    return (
        <div className="flex flex-col items-center bg-gray-800 h-screen">
            <div className="w-screen">
                <NavBar />
            </div>
            <div className="w-5/6">
                <div className="flex flex-row">
                    <div className="w-4/12 text-white">
                        Vote and chat
                    </div>
                
                    <div className="overflow-auto max-h-[800px] w-8/12">
                        <div className="flex flex-col justify-center items-center gap-2 ">
                            {matchs.map((match, index) => (
                                <MatchElement match={match} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Matchs