import styles from './Chef.module.css'

function Chef() {
  return (
    <div className={styles.ChefScreen}>
        <h2 className={styles.titles}>About the chef</h2> 
        <p>I have been cooking for many years already and have a bunch of dishes that I can cook. 
            I like to cook delicious and nutritious food for myself. {"\n"}
            I wanted to share my favorite things I like to make with you guys as it is easy and convenient. 
            Thanks for stopping by!
        </p>
        <h2 className={styles.titles}>My life</h2>
        <p>I have grown up very picky when it came to food, but when I reached middle school. I started to try new and different
             foods and I grew to like them. {"\n"}
             I now enjoy an assortment of foods and always like to try something new. It wasn't until highschool that I asked my
             mother how to cook. {"\n"}
             I loved my mother's cooking and wanted to learn for the future as the food she cooked was really healthy for the mind
             and soul. {"\n"}
             Even now in college, I still cook my favorite meals that I learned from my mom and I always enjoy them.
             It because it makes me feel like I'm at home. 
        </p>
        <img className={styles.image} src={process.env.PUBLIC_URL + '../SelfieImg.JPG'} alt='JonBanh'></img>
    </div>
  );
}

export default Chef;