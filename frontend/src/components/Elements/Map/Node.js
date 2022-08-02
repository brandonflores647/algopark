import classes from './Node.module.css';

const Node = ({ row, col, isStart, isEnd, isWall }) => {
    return (
        <span className={`
            ${classes.cell}
            ${isStart ? classes.startCell
                : isEnd ? classes.endCell
                : isWall ? classes.wallCell : ''}
        `}>
        </span>
    );
}

export default Node;
