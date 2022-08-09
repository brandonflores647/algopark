const bubbleSort = (arr) => {
    let swapped = false;

    for (let i = 0; i < arr.length-1; i++) {
        swapped = false;

        for (let j = 0; j < arr.length-1; j++) {
            if (arr[j].height > arr[j+1].height) {
                const prev = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = prev;
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return arr;
}

export default bubbleSort;
