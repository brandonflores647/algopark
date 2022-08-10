import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const bubbleSort = async (arr, speed) => {
    const newOrder = arr.slice();
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

export default bubbleSort;
