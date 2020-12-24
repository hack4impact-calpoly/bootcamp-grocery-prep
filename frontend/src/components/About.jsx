import React from "react";
import aboutImg1 from "./images/chuna-2.jpg";
import aboutImg2 from "./images/chuna-3.jpg";
import aboutImg3 from "./images/chuna.JPG";


function About() {
  return (
    <section>
      <h1>About</h1>
      <p>
        Hello food lovers! If you're like me, you can appreciate some good
        recipes around the world.
      </p>
      <p>
        That's why I made this site! A place of some of my favorite food
        recipes.
      </p>
      <h2>My Life</h2>
      <p>
        Now this wouldn't be a good food site without going into much detail
        about the author's life...
      </p>
      <h3>Growing Up</h3>
      <p>I grew up with a family who owned a Thai restaraunt.</p>

      <h3>Now</h3>
      <p>
        Now, many years later, I am exploring the many food options that are
        from all around the world!
      </p>
      <div id="tessa-imgs">
            <img class="tessa-img" src={aboutImg1} alt="tessa-img"/>
            <img class="tessa-img" src={aboutImg2} alt="tessa-img"/>
            <img class="tessa-img" src={aboutImg3} alt="tessa-img"/>
        </div>
    </section>
  );
}

export default About;
