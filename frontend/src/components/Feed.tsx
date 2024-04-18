// import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider";

const Feed = () => {
    const {user} = useAuth();

  return (
    <section className="w-full flex flex-col items-center gap-3">
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
                >Don't waste your time and come enjoy with us..
            </p>
            {user && (
                <div className='text-black bg-slate-400 hover:bg-slate-300 font-bold py-4 px-6 my-2 rounded' >
                    <button>
                        <Link to='/matchs'>
                            Go to Matchs
                        </Link>
                    </button>
                </div>
            )}
            <div className='mx-6'>
                {user ? (
                    <div className="desc text-center">
                        Our amazing plateform is 100% free, No credit card required.
                    </div>  
                ) : (
                    <button className="my-5">
                        <Link to='/login' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded'> 
                            Login
                        </Link>
                    </button>
                )

                }
            
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
