import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Co from './components/Co'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Services />
        <Co />
      </main>
      <Footer />
    </div>
  )
}

export default App
