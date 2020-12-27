
import "./css/About.css"
import burrito from './js/components/images/burrito.JPG'
import hotdog from './js/components/images/hotdog.jpeg'
function About() {
    document.title = 'About the Chef';
     return (
         <body>
             <main>
                 <div className="about">
                    <h1>About the Chef</h1>
                 </div>
                <p>Welcome! My life revolves around food and I believe it is important to make eating the most enjoyable expereince possible.</p>
                <p>I created this site to show you some of my personal favorite meals and encourage you to discover new meal options.</p>
                <p>These simple recipes have the ability to bring happiness to you as well as those around you so give them a try!</p>
                <div className="about">
                  <h1>Background</h1>
                </div>
                <p>Food has always been an important part of my life. Growing up, my family often made homemade meals instead of going out to eat which encouraged me to explore different home cooked meal options.</p>
                <p>When I got to college I realized how important it was to have a couple delicious go-to meals that I could rely on.</p>
                <p>I hope these recipes will help inspire you to make some of your own home cooked meals and possibly make some recipes of your own!</p>
                <div className = "aboutImage">
                    <img src= {burrito} height='250px'></img>
                    <img src= {hotdog} height='250px'></img>
                </div>
                </main>
         </body>
        );
     }
export default About