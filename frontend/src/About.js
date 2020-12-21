import './About.css';
import TR from "./images/tylerRamen.JPG";
import CM from "./images/coltMelt.JPG";
import PC from "./images/pratikCake.JPG";
import ME from "./images/mdo.jpg";

function About () {
   document.title = 'About the Chef';

   return (
      <main id="about">
         <h1 id="title">About the Chef</h1>

         <div id="titlePic">
            <img src={ME} alt='opening'></img>
         </div>
      
         <div>
            <p></p>
            <p>As a bunch of college students, I think a lot of us are still getting used to cooking for outselves
            and probably need a little inspiration.</p>
            <p>This site is intended to give you that inspiration while being affordable, simple, and quick.</p>
         </div>

         <h2 id="LifeTitle">My Life and Cooking</h2>

         <div>
            <p>For several years now, I have been an avid baker. I make cakes, cookies, pies, and whatever 
            strikes my interest. Moving into an apartmenr with my own kichen, I am determinded to learn to
            cook relatively well. Well, at least good enough to function on a healhty diet.</p>
         </div>

         <h2 id="FunFact">Fun Fact</h2>

         <div>
            <p>In making this site, rather than snagging some photos off of the internet, I decided to use pictures 
            from my own creations! The crepes were made earlier in the quarter, but the other three recipes were
            for this website (much to the pleasure of my roomates).</p><p></p>
         </div>

         <div id="roomatePics">
            <img src= {TR} alt='TR'></img>
            <img src={CM} alt='CM'></img>
            <img src={PC} alt='PC'></img>
         </div>

      </main>
   );
}

export default About;

