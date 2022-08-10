import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const selectionSort = async (arr, speed, setStacks) => {
    const newOrder = arr.slice();
    const timer = ms => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < newOrder.length-1; i++) {
        let min = i;

        const curEle = document.getElementById(
            `stack-${i}`
        );
        curEle.className = classes.selected;

        let nextEle;
        let minEle;
        for (let j = i+1; j < newOrder.length; j++) {
            nextEle = document.getElementById(
                `stack-${j}`
            );
            nextEle.className = classes.selectedNext;
            await timer(speed);
            if (newOrder[j].height <= newOrder[min].height) {
                if (minEle) minEle.className = classes.stack;
                min = j;
                minEle = document.getElementById(
                    `stack-${j}`
                );
            }
            nextEle.className = classes.stack;
            if (minEle) minEle.className = classes.selectedNext;
        }
        await timer(speed);

        // update stack order
        const temp = newOrder[min];
        newOrder[min] = newOrder[i];
        newOrder[i] = temp;
        if (minEle && minEle.style) {
            const tempHeight = curEle.style.height;
            curEle.style.height = minEle.style.height;
            minEle.style.height = tempHeight;
            minEle.className = classes.stack;
        }
        curEle.className = classes.stack;
        (async () => {
            await setStacks(newOrder);
        })();
    }
    return newOrder;
}

export default selectionSort;
