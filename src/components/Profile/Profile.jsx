
import styles from './profile.module.css'

const Profile = () => {
  return (
    <div className={styles.profile}>

        <img src="https://avatars.githubusercontent.com/u/126015485?v=4" alt="Profile" className={styles.profileImage} />
        <h1 className={styles.profileTitle}>Profile</h1>
        <p className={styles.profileDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
      
    </div>
  )
}

export default Profile
