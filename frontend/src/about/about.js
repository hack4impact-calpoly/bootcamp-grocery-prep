import './about.css';
import vincent from '../pictures/vincent.jpg'

function About() {
  return (
    <main>
        <h2>About the Team</h2>
            <p>Knife's Edge consists of our most renowned homecooks working around the clock to curate the hundreds of recipe submissions we recieve daily.</p>
            <p>Their dedication and love to the craft is undeniable. Let's meet one of the cooks now!</p>
        <section>
            <h3>Vincent Pheng</h3>
            <img src={vincent} alt="Chef Vincent"/>
            <p>
                Hey everybody! I'm Vincent and I've been a homecook for about 4 years now. <br/> <br/>
                I remember the first thing I ever cooked when my mom first let me was just simple over easy eggs that I somehow managed to burn. <br/>
                I'm happy to say though that I have grown much since then as a homecook, learning and absorbing hundreds of recipes from a wide <br/>
                range of cultures, but I'm well aware that I have much to learn still. <br/><br/>
                I mostly specialize in seafood and asian cuisine, so most of the recipes that you'll see curated by me will be along those lines. <br/>
                Knife's Edge has given me the platform I needed to share my love for cooking and I hope we can be your go-to for your next dinner date recipes!
            </p>
        </section>
    </main>
  );
}

export default About;