import bubbleSort from '../../../Algorithms/bubbleSort';
import selectionSort from '../../../Algorithms/selectionSort';

const SortTools = ({ stacks, speed, setSpeed, stackAmount, setStackAmount }) => {
  const sortStacks = async (algo) => {
    algo(stacks, speed);
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
      <button onClick={() => sortStacks(selectionSort)}>SORT</button>
    </div>
  );
}

export default SortTools;
