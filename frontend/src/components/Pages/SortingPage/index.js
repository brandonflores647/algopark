import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from './Stack';
import SortTools from './SortTools';
import Description from './Description';
import classes from './SortingPage.module.css';

import { setMapThunk } from '../../../store/session';

const SortingPage = () => {
  const dispatch = useDispatch();

  const [stackAmount, setStackAmount] = useState(126);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [stacks, setStacks] = useState([]);
  const [speed, setSpeed] = useState(80); // time in ms ('Normal' default)
  const [algorithm, setAlgorithm] = useState('bubbleSort');

  useEffect(() => {
    (async () => {
      await dispatch(setMapThunk(null));
    })();
  }, []);

  useEffect(() => {
    const oldStacks = [];
    for (let i = 0; i < stackAmount; i++) {
      const height = Math.floor(Math.random() * (100 - 2) + 2);
      oldStacks.push(stackTemplate(height));
    }
    setStacks(oldStacks);
  }, [stackAmount, resetTrigger]);

  const stackTemplate = (height) => {
    return {
      height
    };
  }

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.stackContainer} style={{gap:(stackAmount<125?'0.25%':'')}}>
        {stacks.map((stack, i) => {
          return (
            <Stack
            key={`stack-${i}`}
            height={stack.height}
            stackAmount={stackAmount}
            index={i}
            />
            )
          })}
      </div>
      <SortTools
        stacks={stacks}
        setStacks={setStacks}
        speed={speed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setSpeed={setSpeed}
        stackAmount={stackAmount}
        setStackAmount={setStackAmount}
        resetTrigger={resetTrigger}
        setResetTrigger={setResetTrigger} />
      <Description algo={algorithm} />
    </div>
  );
}

export default SortingPage;
