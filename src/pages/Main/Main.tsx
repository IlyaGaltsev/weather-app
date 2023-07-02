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

  const getDaData = () => {
    var url = 'https://cleaner.dadata.ru/api/v1/clean/address'
    var token = '786f86c8fa7e5b49d9a00e9188dcdb352a15c739'
    var secret = '1c7e49d03ceb23552d5f45af92de0be9b642756f'
    var query = 'мск сухонска 11/-89'

    var options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
        'X-Secret': secret
      },
      body: JSON.stringify([query])
    }

    axios
      .get(url, options)
      // .then(response => response.())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }
  return (
    <div className="main__wrapper">
      <input />
      <CurrentWeather
        current={currentWeather?.current}
        location={currentWeather?.location}
      />

      <button onClick={getDaData}>getDadata</button>
      <button onClick={getCurrentWeather}>getWeather</button>
    </div>
  )
}

export default Main
