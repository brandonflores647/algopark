import classes from './SplashPage.module.css';

const SplashPage = () => {
    return (
        <div className={classes.splashWrapper}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>
                    <h1>AlgoPark helps users visualize and interact with algorithms.</h1>
                    <span>Choose from pathfinding or sorting algorithms. Draw a path and watch dijkstras algorithm navigate through the obstacles you created. Hop into our sorting page to randomize a set of stacks and choose your speed. Watch the algorithm of your choosing sort those stacks in real time!</span>
                </div>
                <img className={classes.gridTop} src='/static/sortVisual1.png' alt='sort visual' width={'400px'}/>
            </div>
            <div className={classes.line}></div>
            <div className={classes.footer}>
                <section className={classes.footerLeft}>
                    <span className={classes.flTitle}>Algo Park</span>
                    <span className={classes.flName}>Created by: Brandon Flores</span>
                </section>
                <section className={classes.footerRight}>
                    <span className={classes.frTitle}>Contact Me</span>
                    <span className={classes.frName}>
                        <a href='https://www.linkedin.com/in/brandon-flores-798b98239/' target='_blank' rel="noreferrer">
                            LinkedIn <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <span>
                            <a href='https://github.com/brandonflores647' target='_blank' rel="noreferrer">
                                Github <i class="fa-brands fa-github-alt"></i>
                            </a>
                        </span>
                    </span>
                </section>
            </div>
        </div>
    );
}

export default SplashPage;
