import React, { useState } from 'react'
import App from '../App'
import { theme } from '../constant/constJobTodo'
import { ContextTheme } from '../constant/constContext'

const Context = () => {
    const {light, dark} = theme
    const [themeActive, setTheme] = useState(light)
    const handleChangeTheme = () => {
        setTheme(themeActive === light ? dark : light)
    }
    return (
        <ContextTheme.Provider value={themeActive}>
            <App handleChangeTheme= {handleChangeTheme}/>
        </ContextTheme.Provider>
        )
}

export default Context