
const Feed = () => {
  return (
    <section className="w-full flex flex-col items-center gap-7">
        <h1 className="head_text text-center">
            Vote & Discuss about
            <br className="max-md:hidden"/> {/* from 0 -> md : hidden */}
            <span className="orange_gradient text-center">Valorant Match Results</span>
        </h1>
        <p className="desc text-center">Our amazing plateform will let you vote your favorite team
        and let you discuss the match's details with passionate people like you!
        </p>

        <div className="flex flex-col justify-center items-center">
            <p
                className="text-center text-slate-400 text-2xl"
                >Dont waste your time and come to enjoy with us.</p>
            <div className='mx-6 my-4'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Register
                </button>
            </div>
        </div>
        <div className="my-2 w-2/3 h-1/2 flex justify-center items-center">
            <img
                className="w-1/2 h-1/2 rounded-lg shadow-lg border-2 border-gray-200"
                src="/feed-team.png"
                alt="feed-team"
            />
        </div> 
        
    </section>
  )
}

export default Feed
