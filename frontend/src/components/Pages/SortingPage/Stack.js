import classes from './SortingPage.module.css';

const Stack = ({ height, stackAmount, index }) => {
    const styleObj = {
        width: `${100/stackAmount}%`,
        height: `${height}%`,
    }
    return (
        <div
            id={`stack-${index}`}
            style={styleObj}
            className={classes.stack}
        ></div>
    );
}

export default Stack;
