import { useContext, useEffect } from 'react'
import AuthContext from '../stores/authContext'
import styles from '../styles/Guides.module.css'

export default function Guides() {
  const { user, authReady } = useContext(AuthContext)
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/guides', user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      })
      .then(res => {
        if (!res.ok) {
          throw Error('You must be logged in to view this content')
        }
        return res.json()
      })
      .then(data => {
        setGuides(data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        setGuides(null)
      })
    }
  }, [user])

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}

      {error && <div className={styles.error}>
        <p>{ error }</p>
      </div>}

      {guides && guides.map(guide => {
        <div key={guide.title} className={styles.card}>
          <h3>{ guide.title }</h3>
          <h4>Written by { guide.author }</h4>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula</p>
        </div>
      })}        
    </div> 
  )
}