import Appdownload from '../components/Appdownload'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Joblisting from '../components/Joblisting'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Joblisting/>
      <Appdownload/>
      <Footer/>
    </div>
  )
}

export default Home
