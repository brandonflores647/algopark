import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const insertionSort = async (arr, speed, setStacks, setPlaying) => {
    const newOrder = arr.slice();
    const timer = ms => new Promise(res => setTimeout(res, ms));

    for (let i = 1; i < newOrder.length; i++) {
        let curVal = newOrder[i];
        const curEle = document.getElementById(
            `stack-${i}`
        );
        if (!curEle) return;
        curEle.className = classes.selected;

        let j;
        let nextEle;
        let flipEle;
        for (j = i-1; j >= 0 && newOrder[j].height > curVal.height; j--) {
            nextEle = document.getElementById(
                `stack-${j}`
            );
            if (!nextEle) return;
            flipEle = document.getElementById(
                `stack-${j+1}`
            );
            if (!flipEle) return;

            nextEle.className = classes.selectedNext;
            flipEle.className = classes.selected;

            await timer(speed);

            newOrder[j + 1] = newOrder[j];

            const tempHeight = flipEle.style.height;
            flipEle.style.height = nextEle.style.height;
            nextEle.style.height = tempHeight;
            flipEle.className = classes.selectedNext;
            nextEle.className = classes.selected;

            await timer(speed);
            flipEle.className = classes.stack;
            nextEle.className = classes.stack;
        }
        await timer(speed);

        newOrder[j + 1] = curVal;

        curEle.className = classes.stack;
        (async () => {
            await setStacks(newOrder);
        })();
    }

    setPlaying(false);
    return newOrder;
}

export default insertionSort;
