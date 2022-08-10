import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from './Stack';
import classes from './SortingPage.module.css';

import { setMapThunk } from '../../../store/session';
import bubbleSort from '../../../Algorithms/bubbleSort';

const SortingPage = () => {
  const dispatch = useDispatch();

  const [stackAmount, setStackAmount] = useState(90);
  const [stacks, setStacks] = useState([]);
  const [speed, setSpeed] = useState(10); // time in ms

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
  }, [stackAmount]);

  const stackTemplate = (height) => {
    return {
      height
    };
  }

  const sortStacks = async (algo) => {
    algo(stacks, speed);
  }

  return (
    <div className={classes.pageWrapper}>
      <button onClick={() => sortStacks(bubbleSort)}>SORT</button>
      <div className={classes.stackContainer}>
        {stacks.map((stack, i) => {
          return (
            <Stack
              key={`stack-${i}`}
              height={stack.height}
              index={i}
            />
          )
        })}
      </div>
    </div>
  );
}

export default SortingPage;
