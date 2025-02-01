import { useEffect } from "react"
import Logo from "../assets/resto_cafe_logo.png"
import { useNavigate } from "react-router-dom"

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
      navigate("/home")
    },2000)
  },[navigate])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <img src={Logo} alt="logo" className="w-[30%] md:w-fit rounded-4xl scale-3d animate-pulse" />
    </div>
  )
}
