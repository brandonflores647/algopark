import classes from './SortingPage.module.css';

const Stack = ({ height, index }) => {
    const styleObj = {
        width: `5px`,
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
