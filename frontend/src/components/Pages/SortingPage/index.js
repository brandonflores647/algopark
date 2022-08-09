import { useState, useEffect } from 'react';

import Stack from './Stack';
import classes from './SortingPage.module.css';

import bubbleSort from '../../../Algorithms/bubbleSort';

const SortingPage = () => {
  const [stackAmount, setStackAmount] = useState(90);
  const [stacks, setStacks] = useState([]);
  const [speed, setSpeed] = useState(10); // time in ms

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
    // const newOrder = algo(stacks);
    const newOrder = stacks.slice();
    const timer = ms => new Promise(res => setTimeout(res, ms));

    let swapped = false;
    for (let i = 0; i < newOrder.length-1; i++) {
      swapped = false;

      for (let j = 0; j < newOrder.length-1; j++) {
        const curEle = document.getElementById(
          `stack-${j}`
        );
        const nextEle = document.getElementById(
          `stack-${j+1}`
        );

        if (newOrder[j].height > newOrder[j+1].height) {
            const prev = newOrder[j];

            curEle.className = classes.selected;
            nextEle.className = classes.selectedNext;
            await timer(speed);
            curEle.className = classes.selectedNext;
            nextEle.className = classes.selected;
            curEle.style.height = `${newOrder[j+1].height}%`;
            nextEle.style.height = `${newOrder[j].height}%`;
            await timer(speed);

            newOrder[j] = newOrder[j+1];
            newOrder[j+1] = prev;
            swapped = true;
            curEle.className = classes.stack;
            nextEle.className = classes.stack;
        }
      }

      if (!swapped) break;
    }
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
