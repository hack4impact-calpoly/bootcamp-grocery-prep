import React from 'react'
import './About.css';
import { Link } from 'react-router-dom';

class About extends React.Component {
   render() {
      return (
         <div className='about'>
            <h2>About Stick</h2>

            <p>Hello~ I don't really know what to say about myself but I always love a nice drink to help set the mood whenever I'm doing anything.</p>
			<p>It's not listed as a recipe on here, but I absolutely love boba milk tea! My go to milk tea flavor is okinawa milk tea but on a hotter days I tend to go for a more fruity tea instead.</p>
			<p>To be honest though, I don't really know what I'm doing. These recipies aren'd mine and I don't drink coffee so don't actuaaly try to make any of those becasuse you might end up with a really bad dasting drink haha. </p>
			<p>Whelp reguardless of whether you care or not, I'm going to tell you more about me</p>

			<h3>The story behing the name stick</h3>

			<p>The french writer&nbsp;<Link to="https://en.wikipedia.org/wiki/Stendhal">Stendhal</Link>&nbsp;once describes the process in which one's unattractive characteristics are transformed into a desirable quality as&nbsp;<Link to="https://en.wikipedia.org/wiki/Crystallization_(love)">crystallization</Link>.</p>
			<p>He used an analogy of a stick in a salty river that was crystalized. With the crystals around it, the stick lookid magnificent, but after a little bit, the crystals would fall off and it would look like any other stick again. </p>
			<p>When I first heard this, it deeply resonated with me, I'm just a stick. And I think its okay. I don't have to be very special or anything (but that won't stop me from trying). </p>

			<p>At this point, i got to lazy to write more and add images so have fun looking around!</p>
         
         </div>
      );
   }
}

export default About;
