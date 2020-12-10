import './About.css';

import chef from '../imgs/chef.jpg';

function About() {
	document.title = 'About the Jeff';

	return (
		<main id='about'>
			<h1>About the Chef</h1>
			<p>My name Chef</p>
			
			<div id='chef_photo'>
				<img src={chef} alt='Pic of the chef'></img>
			</div>
		</main>
	);
}

export default About;
