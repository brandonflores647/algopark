import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const selectionSort = async (arr, speed) => {
    const newOrder = arr.slice();
    const timer = ms => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < newOrder.length; i++) {
        let min = i;

        for (let j = i+1; j < newOrder.length; j++) {
            // grab current and next stacks dom node
            const curEle = document.getElementById(
                `stack-${i}`
            );
            const nextEle = document.getElementById(
                `stack-${j}`
            );

            if (newOrder[j].height < newOrder[min].height) {
                min = j;
            }
        }
        if (min !== i) {
            const temp = newOrder[i];
            newOrder[i] = newOrder[min];
            newOrder[min] = temp;
        }
    }
    return newOrder;
}

export default selectionSort;
