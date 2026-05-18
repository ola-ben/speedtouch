import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Speedtouch — home">
      <img
        src={logo}
        alt="Speedtouch — cleanings and hygiene Ltd"
        className="h-10 w-auto"
        width="1087"
        height="333"
      />
    </Link>
  )
}

export default Logo
