import style from './Rating.module.css'

function Rating (props) {
    const empty_star = <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>;
    const half_star = <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>;
    const full_star = <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/></svg>;

    let rating = props.rating.length ? Math.round(average(props.rating) * 2) : 0;
    const numFull = Math.floor(rating / 2);
    const numHalf = (rating % 2 === 0) ? 0 : 1;

    let stars = new Array(5);
    stars.fill(empty_star);
    stars.fill(full_star, numFull);
    if (numHalf) stars[numFull] = half_star;

    return (
        <div className={style.div} style={{color: props.color ? props.color : 'inherit'}}>
            {stars}
            <h3 className={style.numRatings}>({props.rating.length})</h3>
        </div>
    )
}

const average = list => {
    let sum = list.reduce((a, b) => a + b);
    return sum / list.length;
}

export default Rating;