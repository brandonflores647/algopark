import classes from './TemplateList.module.css';

const XButton = ({ handleDelete, playing, map }) => {
    return (
        <div
            className={classes.xContainer}
            onClick={() => (!playing?handleDelete(map.id, map.name):null)}
        >
            <div className={`${classes.blockTL} ${classes.block}`}></div>
            <div className={`${classes.blockTR} ${classes.block}`}></div>
            <div className={`${classes.blockBL} ${classes.block}`}></div>
            <div className={`${classes.blockBR} ${classes.block}`}></div>
        </div>
    );
}

export default XButton;
