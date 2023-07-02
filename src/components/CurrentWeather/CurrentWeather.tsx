import { ICurrentWeather } from '../../types'
import styles from './CurrentWeather.module.css'

const CurrentWeather = ({ current, location }: ICurrentWeather) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoBlock}>
        <h2 className={styles.title}>{current?.temp_c ?? 0}°</h2>
        <p className={styles.subtitle}>Feels like {current?.feelslike_c ?? 0}°</p>
        <p className={styles.middleTitle}>{location?.name}</p>
      </div>

      <div className={styles.illustrationBlock}>
        {current?.condition.icon ? (
          <img
            src={current?.condition.icon}
            alt={current?.condition.text}
          />
        ) : null}

        <p className={styles.middleTitle}>{current?.condition.text}</p>
      </div>
    </div>
  )
}

export default CurrentWeather
