import React, { useState } from 'react'
import { theme } from '../constant/constJobTodo'
import { ContextTheme } from '../constant/constContext'

 const Context = ({children}) => {
    const {light, dark} = theme
    const [themeActive, setTheme] = useState(light)
    const handleChangeTheme = () => {
        setTheme(themeActive === light ? dark : light)
    }
    return (
        <ContextTheme.Provider value={{themeActive, handleChangeTheme}}>
            {children}
        </ContextTheme.Provider>
        )
}

export default Context