import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const merge = async (left, right, middle) => {
    const timer = ms => new Promise(res => setTimeout(res, ms));
    let res = [];
    let leftIdx = 0;
    let rightIdx = 0;

    left.forEach(async (ele, i) => {
        const curEle = document.getElementById(`stack-${i}`);
        await timer(100*i)
        curEle.style.height = `${ele.height}%`;
    })
    right.forEach(async (ele, i) => {
        const curEle = document.getElementById(`stack-${i+middle}`);
        await timer(100*i)
        curEle.style.height = `${ele.height}%`;
    })

    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx].height < right[rightIdx].height) {
            res.push(left[leftIdx]);
            leftIdx++;
        } else {
            res.push(right[rightIdx]);
            rightIdx++;
        }
    }

    return res.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
}

const mergeSort = async (ogArr, arr, speed, setStacks, setPlaying) => {
    const timer = ms => new Promise(res => setTimeout(res, ms));

    if (arr.length <= 1) {
        setPlaying(false);
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = await mergeSort(ogArr, arr.slice(0, middle), speed, setStacks, setPlaying);
    const right = await mergeSort(ogArr, arr.slice(middle), speed, setStacks, setPlaying);

    const mergeRes = await merge(left, right, middle);

    return mergeRes;
}

export default mergeSort;
