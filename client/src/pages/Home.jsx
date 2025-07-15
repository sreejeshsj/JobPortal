import Appdownload from '../components/Appdownload'
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
    </div>
  )
}

export default Home
