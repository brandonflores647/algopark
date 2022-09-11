import { useState } from 'react';

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
        <span style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <h2 className={classes.title}>Welcome to AlgoPark!</h2>
          <div className={classes.lineFadeLarge}></div>
        </span>

        <div className={classes.content}>
          <span style={{width:'50%'}}>
            <img className={classes.contentImg} src='/static/tool-select.gif'></img>
            <p style={{display:'flex',alignItems:'center'}}>
              <span>
                <div style={{backgroundColor:'#7F83AA',width:'fit-content',display:'inline-block',padding:'5px 9px 3px 9px',borderRadius:'5px'}}>
                  <img src='/static/left-click.svg' width='22px'></img>
                </div>
              </span>
              <span className={classes.description}>
                Left click on your toolbar to change the selected tool.
              </span>
            </p>
            <div className={classes.lineFade} style={{margin:'30px 10px 30px 10px'}}></div>
            <div style={{display:'flex',justifyContent:'space-evenly',marginBottom:'25px'}}>
              <span className={classes.controlButton}>PLAY</span>
              <span className={classes.controlButton}>CLEAR</span>
              <span className={classes.controlButton}>SAVE</span>
            </div>
            <ul className={classes.description} >
              <li>
                Press 'Play' to watch Dijkstra's pathfinding algorithm navigate your map.
              </li>
              <li>
                Press 'Clear' to wipe your canvas clean.
              </li>
              <li>
                Press 'Save' to solidify your canvas into a template.
              </li>
            </ul>
          </span>
          <span style={{width:'50%'}}>
            <img className={classes.contentImg} src='/static/drawing.gif'></img>
            <p style={{display:'flex',alignItems:'center'}}>
              <span>
                <div style={{backgroundColor:'#7F83AA',width:'fit-content',display:'inline-block',padding:'5px 9px 3px 9px',borderRadius:'5px'}}>
                  <img src='/static/left-click.svg' width='22px'></img>
                </div>
              </span>
              <span className={classes.description}>
                Left click and drag to paint your current tool onto the canvas.
              </span>
            </p>
          </span>
        </div>

        <div className={classes.navContainer}>
          <span
            className={`${classes.navContent} ${classes.skip}`}
            onClick={() => setTutorial(false)}
          >
            Close Tutorial
          </span>
        </div>
      </div>
    </div>
  );
}

export default TutorialModal;
