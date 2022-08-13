import classes from '../components/Pages/SortingPage/SortingPage.module.css';

const merge = (left, right) => {
    let res = [];

    while (left.length && right.length) {
        if (left[0].height < right[0].height) {
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }

    return res.concat(left.slice().concat(right.slice()));
}

const mergeSort = async (arr, speed, setStacks, setPlaying) => {
    const timer = ms => new Promise(res => setTimeout(res, ms));

    if (arr.length <= 1) {
        setPlaying(false);
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, middle), speed, setStacks, setPlaying);
    const right = await mergeSort(arr.slice(middle), speed, setStacks, setPlaying);

    return merge(left, right);
}

export default mergeSort;
