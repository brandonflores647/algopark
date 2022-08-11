import classes from './SplashPage.module.css';

const Footer = () => {
    return (
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
    );
}

export default Footer;
