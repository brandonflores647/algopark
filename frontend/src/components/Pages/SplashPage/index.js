import classes from './SplashPage.module.css';

const SplashPage = () => {
    return (
        <div className={classes.splashWrapper}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>
                    <h1>AlgoPark helps users visualize and interact with algorithms.</h1>
                    <span>Choose from pathfinding or sorting algorithms. Draw a path and watch dijkstras algorithm navigate through the obstacles you created. Hop into our sorting page to randomize a set of stacks and choose your speed. Watch the algorithm of your choosing sort those stacks in real time!</span>
                </div>
                <img src='/static/sortVisual1.png' alt='sort visual' width={'400px'}/>
            </div>

            <div className={classes.line}></div>


        </div>
    );
}

export default SplashPage;
