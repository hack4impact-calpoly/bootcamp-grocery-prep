import styles from './Profile.module.css';
import me from '../../images/me.jpg';

function Profile() {
  return (
        <section>
            <h1>About the Chef</h1>
            <p>Hello hello! I to try to cook, but if I am being honest I rarely follow recipes and prefer to make stuff with what I have/I'm craving</p>
            <p>Here are some of my favorite recipes I have made in the past year.</p>
            <img src={me} height='400'/>
            
        </section>
  );
}

export default Profile;