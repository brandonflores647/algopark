import classes from '../components/Pages/SortingPage/SortingPage.module.css';
const timer = ms => new Promise(res => setTimeout(res, ms));

const mergeSort = async (arr, speed, setPlaying) => {
    const animations = [];
    if (arr.length <= 1) return;

    const newOrder = arr.slice();
    mergeSortHelper(arr, 0, arr.length-1, newOrder, animations);

    for (let i = 0; i < animations.length; i++) {
        const stackArr = document.getElementsByClassName(classes.stack);
        const colorCheck = i%3 !== 2; // false every third element (height change on false)
        if (colorCheck) {
            const [stackOnePos, stackTwoPos] = animations[i];
            const stackOneStyle = stackArr[stackOnePos].style;
            const stackTwoStyle = stackArr[stackTwoPos].style;
            if (i%3===0) {
                setTimeout(() => {
                    stackOneStyle.backgroundColor = '#fac26e';
                    stackTwoStyle.backgroundColor = '#fac26e';
                }, i*speed);
            } else {
                setTimeout(() => {
                    stackOneStyle.backgroundColor = 'rgb(104, 104, 255)';
                    stackTwoStyle.backgroundColor = 'rgb(104, 104, 255)';
                }, (i*speed)+15);
            }
        } else {
            setTimeout(() => {
                const [stackOnePos, newHeight] = animations[i];
                const stackOneStyle = stackArr[stackOnePos].style;
                stackOneStyle.height = `${newHeight}%`;
                if (i === animations.length-1) setPlaying(false);
            }, i*speed);
        }
    }
}

const mergeSortHelper = (ogArr, startPos, endPos, newOrder, animations) => {
    if (startPos === endPos) return;

    const middlePos = Math.floor((startPos+endPos)/2);
    mergeSortHelper(newOrder, startPos, middlePos, ogArr, animations); // left
    mergeSortHelper(newOrder, middlePos + 1, endPos, ogArr, animations); // right

    doMerge(ogArr, startPos, middlePos, endPos, newOrder, animations); // merge left and right
}

const doMerge = (ogArr, startPos, middlePos, endPos, newOrder, animations) => {
    let k = startPos;
    let i = startPos;
    let j = middlePos + 1;

    while (i <= middlePos && j <= endPos) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (newOrder[i].height <= newOrder[j].height) {
            animations.push([k, newOrder[i].height]);
            ogArr[k++] = newOrder[i++];
        } else {
            animations.push([k, newOrder[j].height]);
            ogArr[k++] = newOrder[j++];
        }
    }
    while (i <= middlePos) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, newOrder[i].height]);
        ogArr[k++] = newOrder[i++];
    }
    while (j <= endPos) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, newOrder[j].height]);
        ogArr[k++] = newOrder[j++];
    }
}

export default mergeSort;
