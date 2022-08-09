import { useState, useEffect } from 'react';

import Stack from './Stack';
import classes from './SortingPage.module.css';

import bubbleSort from '../../../Algorithms/bubbleSort';

const SortingPage = () => {
  const [stackAmount, setStackAmount] = useState(30);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    const oldStacks = [];
    for (let i = 0; i < stackAmount; i++) {
      const height = Math.floor(Math.random() * 100) + 2;
      oldStacks.push(stackTemplate(height));
    }
    setStacks(oldStacks);
  }, [stackAmount]);

  const stackTemplate = (height) => {
    return {
      color: 'blue',
      height
    };
  }

  const sortStacks = (algo) => {
    console.log(algo(stacks));
  }

  return (
    <div className={classes.pageWrapper}>
      <button onClick={() => sortStacks(bubbleSort)}>SORT</button>
      <div className={classes.stackContainer}>
        {stacks.map((stack, i) => {
          return <Stack height={stack.height} color={stack.color} key={`stack-${i}`}/>
        })}
      </div>
    </div>
  );
}

export default SortingPage;
