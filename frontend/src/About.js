import style from './About.module.css'

function About () {
    return (
        <div>
            <div>
                <h1>About Me</h1>
                <div class={style.flex}>
                    <img className={style.img} src="./images/Vance ID_3.jpg" />
                    <p>Hello everyone, my name is Vance Winstead. I may not be a chef, but I certainly love food! I'm using this website 
                        to showcase some of my favorite recipies while learning more about web development along the way. Enjoy!
                    </p>
                </div>
            </div>

            <footer className={style.footer}>
                <p>Like this website?</p>
                <p>Connect with me here:</p>
                <ul className={style.square}>
                    <li><a className={style.a} href="mailto:vance.winstead@gmail.com">Email</a></li>
                    <li><a className={style.a} href="https://www.linkedin.com/in/vwinstea/">LinkedIn</a></li>
                    <li><a className={style.a} href="https://vwinstea.github.io/WebResume/">Personal Website</a></li>
                </ul>
            </footer>
        </div>
    )
}

export default About