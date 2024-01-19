'use client';
import Image from 'next/image'
import { useState } from 'react'


export default function Home() {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState('')
  
  const getWeather = async () => {
    const api_key = process.env.NEXT_PUBLIC_API_WEATHER_KEY
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&lang=pt_br&appid='+api_key
    
    if (location) {
      try {
        const res = await fetch(api_url)
        const data = await res.json()

        if (data){
          const api_data = {
            country: data.sys.country,
            city: data.name,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            pressure: data.main.pressure,
            visibility: data.visibility,
            icon: data.weather[0].icon
          }

          const url_img_icon = 'https://openweathermap.org/img/wn/'+api_data.icon+'@2x.png'
          const visibility = api_data.visibility/1000
          const temperature = Math.round(api_data.temp)
          
          setWeather(<>
              <div className='text-center text-2xl p-2'>{api_data.city}, {api_data.country}</div>
              <div className='flex justify-center'>
                <div className='flow-root'>
                  <div className='float-left'><img src={url_img_icon} width='100' height='100' alt={api_data.condition} /></div>
                  <div className='float-left text-6xl degrees'>{temperature}</div>
                </div>
              </div>
              <div className='text-center text-gray-800'>{api_data.condition}, <span className='text-gray-600'>{api_data.description}</span></div>
              <div className='grid grid-cols-2 gap-4'>
                <div className=' text-gray-600'>Humidade: {api_data.humidity} %</div>
                <div className=' text-gray-600'>Vento: {api_data.wind} m/s</div>
                <div className=' text-gray-600'>Visibilidade: {visibility} Km</div>
                <div className=' text-gray-600'>Pressão: {api_data.pressure} hPa</div>
              </div>          
          </>)
        
        }
      } catch(err) {
        console.log(err)
      }
    } else {
      // no location entered
    }
  }

  return (
  <>
    <nav className='flex items-center justify-center py-4 bg-gray-100 w-full m-0 opacity-90'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
        </div>
        <input className='block bg-slate-700 text-white rounded-lg opacity-70 pl-10 p-2'
        type='text'
        id='location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder='Location (ie. Paris)' />
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2.5 rounded-lg' id='search' onClick={getWeather}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
        <span className='sr-only'>BUSCAR</span>
      </button>
    </nav>      

    { weather &&
    <div className='flex w-full p-20 justify-center'>
      <div className='w-full max-w-xs'>
        <div className='mb-4'>
          <div className='bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4 opacity-80'>
            {weather}
          </div>
        </div>
      </div>
    </div>
    }

  </>
  )
}
