import React from "react";
import me from "../images/aboutMePic.jpg";

class AbouttheChef extends React.Component {
  render() {
    return (
      <div>
        <h2>About the Chef</h2>
	<p>{"Hey all! Hope you are enjoying the recipes. I've really been working hard to provide a very diverse set of foods to appeal to lovers of all cuisines. I'm still working on adding more unique meals to this site, so sit tight for now and I will be out with new content soon :)"}</p>
	<img src={me} height="400"/>
	<p>{"I've always loved food, especially since its a necessity to live. So what better way to share my love of food than to create my own website? And the recipes I have given are all pretty quick, pretty easy, and pretty accesible. I know there are plenty of college students like myself who want to learn to cook, and even more, who want to have good food to eat. I believe this site removes the searching process, especially since it has basically all the food a college student could need. But yeah, hope you like the site."}</p>
      </div>
    );
  }
}

export default AbouttheChef;
