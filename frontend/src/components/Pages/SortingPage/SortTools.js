import bubbleSort from '../../../Algorithms/bubbleSort';

const SortTools = ({ stacks, speed, stackAmount, setStackAmount }) => {
  const sortStacks = async (algo) => {
    algo(stacks, speed);
  }

  return (
    <>
		  <input
				type="range"
				min="6"
				max="256"
				step="2"
				value={stackAmount}
				onChange={(e) => setStackAmount(e.target.value)}
			/>
      <button onClick={() => sortStacks(bubbleSort)}>SORT</button>
    </>
  );
}

export default SortTools;
