import './Main.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentWeather from '../../components/CurrentWeather'
import { ICurrentWeather } from '../../types'

const Main = () => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })

  const getCurrentWeather = () => {
    const token = 'c4f510c9c5f14abdbcd123513230107'
    console.log('Приход координат', coordinates)

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${token}&q=${coordinates.latitude},${coordinates.longitude}`
      )
      .then(({ data }) => {
        setCurrentWeather(data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const fetchWeatherData = () => {
      if (!navigator.geolocation) {
        console.log('Geolocation не поддерживается вашим браузером')
      } else {
        console.log('Определение местоположения…')
        console.log(
          'navigator',
          navigator.geolocation.getCurrentPosition(
            (position: any) => {
              setCoordinates(
                state =>
                  (state = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  })
              )
            },
            () => console.log('Сегодня не фартануло тебе')
          )
        )
      }
    }

    fetchWeatherData()
    getCurrentWeather()
  }, [])
  return (
    <div>
      <CurrentWeather
        current={currentWeather?.current}
        location={currentWeather?.location}
      />

      <button onClick={getCurrentWeather}>getWeather</button>
    </div>
  )
}

export default Main
