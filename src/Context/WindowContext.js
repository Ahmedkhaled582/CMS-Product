import { createContext , useState , useEffect } from "react";
export const WindowSize = createContext(null) 

export default function WindowContext({children}){
    const [windowsize , setwindowsize] = useState(window.innerWidth)


    useEffect(()=> {
        function setwindowwidth(){
            setwindowsize(window.innerWidth)
        }
        window.addEventListener("resize" , setwindowwidth)
        return () => {
            window.removeEventListener("resize" , setwindowwidth)
        }
    },[])
    return(
       <WindowSize.Provider value={{windowsize}}>{children}</WindowSize.Provider>
    )
}