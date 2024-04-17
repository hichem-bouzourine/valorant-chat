import { Match } from "../services/Types"

interface MatchElementProps {
    match : Match
    index : number
}

const MatchElement = ({match, index} : MatchElementProps) => {
  return (
    <div key={index} className="flex flex-row border-y rounded-md py-3 hover:cursor-pointer hover:bg-gray-700">
        <div className="flex flex-row justify-center items-center w-52">
            <p className="desc">{match.team1}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-[34rem]">
            <div className="flex flex-row justify-center items-center gap-5">
                <img src={match.tournament_icon} alt="Tournament icon" className="w-1/12" />
                <p className="orange_gradient">{match.tournament_name}</p>
            </div>
        </div>
        <div className="flex flex-row justify-start items-center w-52">
            <p className="desc">{match.team2}</p>
        </div>
    </div>
  )
}

export default MatchElement