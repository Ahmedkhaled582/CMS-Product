import { createContext , useContext ,useState } from "react"
export const Menu = createContext("");

export default function MenuContext({children}){
    const [isOpen , setisOpen] = useState(true)
    return <Menu.Provider value={{isOpen , setisOpen}}>{children}</Menu.Provider>
}