import bubbleSort from '../../../Algorithms/bubbleSort';

const SortTools = ({ stacks, speed }) => {
  const sortStacks = async (algo) => {
    algo(stacks, speed);
  }

  return (
    <>
      <button onClick={() => sortStacks(bubbleSort)}>SORT</button>
    </>
  );
}

export default SortTools;
