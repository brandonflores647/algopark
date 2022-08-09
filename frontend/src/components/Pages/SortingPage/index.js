import { useState, useEffect } from 'react';

import Stack from './Stack';
import classes from './SortingPage.module.css';

const SortingPage = () => {
  const [stackAmount, setStackAmount] = useState(30);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    const oldStacks = [];
    for (let i = 0; i < stackAmount; i++) {
      const height = Math.floor(Math.random() * 100);
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

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.stackContainer}>
        {stacks.map(stack => {
          return <Stack height={stack.height} color={stack.color}/>
        })}
      </div>
    </div>
  );
}

export default SortingPage;
