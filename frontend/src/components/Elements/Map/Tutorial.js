import classes from './Tutorial.module.css';

const TutorialModal = ({ setTutorial }) => {
  return (
    <div
      className={classes.tutorialWrap}
      onClick={() => setTutorial(false)}
    >
    <div
      className={classes.tutorialContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <span></span>
    </div>
  </div>
  );
}

export default TutorialModal;
