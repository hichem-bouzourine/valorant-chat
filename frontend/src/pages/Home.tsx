import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Feed from '../components/Feed'


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