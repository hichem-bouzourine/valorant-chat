import NavBar from './NavBar'
import Footer from './Footer'
import Feed from './Feed'


const Home = () => {
  return (
    <div className='flex flex-col justify-between'>
        <div >
            <NavBar />
            <Feed />
        </div>
        <Footer />
    </div>
  )
}

export default Home