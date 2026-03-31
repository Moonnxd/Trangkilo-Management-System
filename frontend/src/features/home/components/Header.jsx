import '../../../assets/styles/index.css'
import logo from '../../../assets/images/logo.png';
// import { Link } from "react-router-dom";

function Header() {
  return (
   <>

    <nav className="w-full h-18 bg-[#f5f7fa] flex items-center justify-between px-5 sm:px-8 md:px-13 lg:px-15 xl:px-18">
      
      <div className="h-17">
        <img src={logo} alt="" className="h-full w-auto object-contain"></img>
      </div>

      <div className="hidden md:flex md:space-x-6 lg:space-x-10 xl:space-x-15 text-black">
        <a>Home</a>
        <a>Services</a>
        <a>About Us</a>
        <a>Contact Us</a>
      </div>

      <div className="space-x-3 md:space-x-5 lg:space-x-8 xl:space-x-10">
        {/* <Link to="/login">
          <button className="text-[#68ab49]">   
            Login
          </button>
        </Link> */}

        <button className="px-3 py-1 xl:px-8 xl:py-2 rounded sm:rounded-sm md:rounded-md lg:rounded-sm xl:rounded-md bg-[#68ab49] text-white">
          Sign Up
        </button>

      </div>

    </nav>
       </>
  );
}

export default Header;