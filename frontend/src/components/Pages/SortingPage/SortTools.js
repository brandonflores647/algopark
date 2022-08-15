import { useState } from 'react';

import bubbleSort from '../../../Algorithms/bubbleSort';
import selectionSort from '../../../Algorithms/selectionSort';
import insertionSort from '../../../Algorithms/insertionSort';
import mergeSort from '../../../Algorithms/mergeSort';

import classes from './SortingPage.module.css';

const SortTools = ({ stacks, setStacks, speed, setSpeed, stackAmount, setStackAmount, resetTrigger, setResetTrigger }) => {
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [playing, setPlaying] = useState(false);

  const sortStacks = async (algo) => {
    switch (algo) {
      case 'bubbleSort': {
        setPlaying(true);
        bubbleSort(stacks, speed, setStacks, setPlaying)
        break;
      }
      case 'selectionSort': {
        setPlaying(true);
        selectionSort(stacks, speed, setStacks, setPlaying)
        break;
      }
      case 'insertionSort': {
        setPlaying(true);
        insertionSort(stacks, speed, setStacks, setPlaying)
        break;
      }
      case 'mergeSort': {
        setPlaying(true);
        mergeSort(stacks, speed, setPlaying);
        break;
      }
    }
  }

  return (
    <div className={classes.toolsContainer}>
      <button
        className={classes.toolButton}
        onClick={() => sortStacks(algorithm)}
        disabled={playing}
        style={{cursor:(playing?'not-allowed':'pointer')}}
      >SORT</button>
      <button
        className={classes.toolButton}
        onClick={() => setResetTrigger(!resetTrigger)}
        disabled={playing}
        style={{cursor:(playing?'not-allowed':'pointer')}}
      >SCRAMBLE</button>
      <label>
      <span>Stack Amount:</span>
        <input
          disabled={playing}
          type="range"
          min="6"
          max="256"
          step="2"
          value={stackAmount}
          onChange={(e) => setStackAmount(e.target.value)}
          className={classes.slider}
          style={{cursor:(playing?'not-allowed':'pointer')}}
        />
      </label>
      <label>
      <span>Speed:</span>
        <select
          className={classes.select}
          defaultValue={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={playing}
          style={{cursor:(playing?'not-allowed':'pointer')}}
        >
          <option value='350'>Very Slow</option>
          <option value='150'>Slow</option>
          <option value='80'>Normal</option>
          <option value='20'>Fast</option>
          <option value='2'>Very Fast</option>
        </select>
      </label>
      <label>
      <span>Algorithm:</span>
        <select
          className={classes.select}
          defaultValue={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={playing}
          style={{cursor:(playing?'not-allowed':'pointer')}}
        >
          <option value={'bubbleSort'}>Bubble Sort</option>
          <option value={'selectionSort'}>Selection Sort</option>
          <option value={'insertionSort'}>Insertion Sort</option>
          <option value={'mergeSort'}>Merge Sort</option>
        </select>
      </label>
    </div>
  );
}

export default SortTools;
