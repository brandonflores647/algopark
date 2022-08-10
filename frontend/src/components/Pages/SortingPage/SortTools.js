import { useState } from 'react';

import bubbleSort from '../../../Algorithms/bubbleSort';
import selectionSort from '../../../Algorithms/selectionSort';

const SortTools = ({ stacks, setStacks, speed, setSpeed, stackAmount, setStackAmount, resetTrigger, setResetTrigger }) => {
  const [algorithm, setAlgorithm] = useState('bubbleSort');

  const sortStacks = async (algo) => {
    console.log(stacks)
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
    <div>
      <label>
      Stack Amount:
        <input
          type="range"
          min="6"
          max="256"
          step="2"
          value={stackAmount}
          onChange={(e) => setStackAmount(e.target.value)}
        />
      </label>
      <label>
      Speed:
        <select defaultValue={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option value='350'>Very Slow</option>
          <option value='150'>Slow</option>
          <option value='80'>Normal</option>
          <option value='20'>Fast</option>
          <option value='2'>Very Fast</option>
        </select>
      </label>
      <label>
      Algorithm:
        <select defaultValue={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value={'bubbleSort'}>Bubble Sort</option>
          <option value={'selectionSort'}>Selection Sort</option>
        </select>
      </label>
      <button onClick={() => sortStacks(algorithm)}>SORT</button>
      <button onClick={() => setResetTrigger(!resetTrigger)}>SCRAMBLE</button>
    </div>
  );
}

export default SortTools;
