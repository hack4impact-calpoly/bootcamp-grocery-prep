import './About.css';
import chef from '../imgs/chef_mac.jpg';
import chef2 from '../imgs/chef_sean.jpg';
import chef3 from '../imgs/chef_h4i.jpg';

function About() {
    return (
        <main id="about-main">
            <h1>About the Chef</h1>
            <p>Bonjour food lovers! If you're anything like me, you can appreciate a
            good meal, but the stress of planning recipes and going shopping often
            stops you from cooking.</p>
            <p>That's why I made this site! A place of hand selected recipes, and a
            super easy way to organize your grocery list, this should be a way to make
            college cooking delightful.</p>

            <section>
                <h2>My Life</h2>
                <p>Now this wouldn't be a recipe site without going into too much detail
                about the author's life, so here we are.</p>

                <h3>Growing Up</h3>
                <p>I grew up buying school lunches, treating food as a fuel for my body.
                This was fine for a while, but the monotony of eating hamburgers and
                chicken nuggets every day eventually got to me.</p>
                <p>I distinctly remember going home and packing my lunch with a turkey
                sandwich, ready to make serious change. While this sandwich was
                <em>mediocore</em> (at best), it still marked a serious change in my life.
                From that day forward, <strong>I was commited to learning how to
                    cook</strong>.</p>

                <h3>Now</h3>
                <p>Now, many years later, I am able to make spaghetti, cook eggs, and
                even bake brownies! This growth is something I am extremely proud of,
                and I hope that you are able to follow a similar journey as mine!</p>
            </section>
            <div className="my-flex">
                <img src={chef} height="250" alt="Mackenzie and I by a bonfire" />
                <img src={chef2} height="250" alt="Chef Sean and I, with a cake" />
                <img src={chef3} height="250" alt="Hack4Impact's chef taco banquet" />
            </div>
        </main>
    );
}

export default About;
