import { useContext, createContext, useState, useEffect } from "react";

import axios  from "axios";


const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather, setWeater] = useState({})

    const [values, setValues] = useState([])

    const [place, setPlace] = useState('Jaipur')

    const [location, setLocation] = useState('')

    //fetch api

    const fetWeather = async() => {

        const options = {

            method: 'GET',

            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',

            params: {
                aggregateHours: '24',
                location: 'place',
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: '0'

            },

            header: {

                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'

            }
        }

        try{
            const respone = await axios.request(options);
            
            console.log(respone.data)

            const thisData = Object.values(respone.data.loctions[0])

            setLocation(thisData.address)
            
            setValues(thisData.values)

            setWeater(thisData.values[0])

        }catch(e) {

            console.error(e);
            
            //if the API throws error.

            alert('This place does not exist')
        }

    }
    useEffect(() => {
        // fetchWeather()
    }, [place])

    useEffect(() =>{
    
    console.log(values)

    },[values])

    return (

        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            location,
            
        
        }}>
            
            {children}

        </StateContext.Provider>

    )

}

export const useStateContext = () => useContext(StateContext)