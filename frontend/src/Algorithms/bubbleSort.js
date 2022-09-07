import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const bubbleSort = async (arr, speed, setStacks, setPlaying) => {
  const newOrder = arr.slice();
  const timer = ms => new Promise(res => setTimeout(res, ms));

  let swapped = false;
  for (let i = 0; i < newOrder.length-1; i++) {
      swapped = false;

      for (let j = 0; j < newOrder.length-1; j++) {
        // grab current and next stacks dom node
        const curEle = document.getElementById(
          `stack-${j}`
        );
        const nextEle = document.getElementById(
          `stack-${j+1}`
        );
        if (!curEle || !nextEle) return;

        if (newOrder[j].height > newOrder[j+1].height) {
            const prev = newOrder[j];

            // assign current/next colors
            curEle.className = classes.selected;
            nextEle.className = classes.selectedNext;
            await timer(speed);

            // flip current/next colors and heights
            curEle.className = classes.selectedNext;
            nextEle.className = classes.selected;
            curEle.style.height = `${newOrder[j+1].height}%`;
            nextEle.style.height = `${newOrder[j].height}%`;
            await timer(speed);

            // update stack order
            newOrder[j] = newOrder[j+1];
            newOrder[j+1] = prev;
            swapped = true;
            (async () => {
              await setStacks(newOrder);
            })();

            // remove colors
            curEle.className = classes.stack;
            nextEle.className = classes.stack;
        }
      }

      if (!swapped) break;
    }
  (async () => {
    await setPlaying(false);
  })();
  return newOrder;
}

export default bubbleSort;
