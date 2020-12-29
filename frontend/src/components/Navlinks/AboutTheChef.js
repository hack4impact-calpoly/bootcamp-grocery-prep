import './AboutTheChef.css';
// import ProfilePicture from '/Images/Navlinks/about-the-chef-image.jpeg'

function AboutTheChef() {
    document.title = 'Grocery Prep - About the Chef'
	return (
        <div className='about-the-chef-content'>
            <h1 className='about-the-chef-title'>About the Chef</h1>
            <div className='about-the-chef-welcome'>
                <div className='about-the-chef-intro'>
                    <p>Hello food lovers!!</p> 
                    <p>As someone who loves to cook but is often too occupied with schoolwork, planning my meals ahead of time was my savior. 
                    Cooking efficiently does not require a ton of organizational skills and can definitely assist others on their journey to adulthood. 
                    In creating this website, I thought that this content would be useful for others too, especially my fellow college students :))</p>
                </div>
                <div className='profile-img'>
                    <img src={process.env.PUBLIC_URL + '/Images/Navlinks/about-the-chef-image.jpeg'}alt='profile picture' height='250px' />
                </div>
            </div>
            <div className='about-the-chef-bio-title'>
                <h2>My Life</h2>
            </div>
            <div className='about-the-chef-bio'>
                <p>Many of my best memories come from cooking with my family. 
                Although, I was not always the best when it came to cooking, I grew to acquire the appropriate skills over time.
                I may not be no Gordon Ramsey, but it is the experience and enjoyment that comes with cooking that matters the most to me. 
                Cooking is honestly one of those skills that everyone should aim to acquire because it definitely allows one to express their creativity.
                I especially love to bake, which is why desserts are what I enjoy cooking the most :D
                </p>
                <p>This recipe website is designed to encourage cooking between people of all skills ranges and are all beginner friendly.
                Enjoy and get creative!!
                </p>
            </div>
        </div>
	);
}

export default AboutTheChef;