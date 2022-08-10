import { useState } from 'react';

import bubbleSort from '../../../Algorithms/bubbleSort';
import selectionSort from '../../../Algorithms/selectionSort';

import classes from './SortingPage.module.css';

const SortTools = ({ stacks, setStacks, speed, setSpeed, stackAmount, setStackAmount, resetTrigger, setResetTrigger }) => {
  const [algorithm, setAlgorithm] = useState('bubbleSort');

  const sortStacks = async (algo) => {
    switch (algo) {
      case 'bubbleSort': {
        bubbleSort(stacks, speed, setStacks)
        break;
      }
      case 'selectionSort': {
        selectionSort(stacks, speed, setStacks)
        break;
      }
    }
  }

  return (
    <div className={classes.toolsContainer}>
      <button onClick={() => sortStacks(algorithm)}>SORT</button>
      <button onClick={() => setResetTrigger(!resetTrigger)}>SCRAMBLE</button>
      <label>
      <span>Stack Amount:</span>
        <input
          type="range"
          min="6"
          max="256"
          step="2"
          value={stackAmount}
          onChange={(e) => setStackAmount(e.target.value)}
          className={classes.slider}
        />
      </label>
      <label>
      <span>Speed:</span>
        <select defaultValue={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option value='350'>Very Slow</option>
          <option value='150'>Slow</option>
          <option value='80'>Normal</option>
          <option value='20'>Fast</option>
          <option value='2'>Very Fast</option>
        </select>
      </label>
      <label>
      <span>Algorithm:</span>
        <select defaultValue={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value={'bubbleSort'}>Bubble Sort</option>
          <option value={'selectionSort'}>Selection Sort</option>
        </select>
      </label>
    </div>
  );
}

export default SortTools;
