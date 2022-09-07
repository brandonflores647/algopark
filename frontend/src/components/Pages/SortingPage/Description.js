import { useState, useEffect } from 'react';

import classes from './SortingPage.module.css';

const Description = ({algo}) => {
    const [desc, setDesc] = useState('')

    useEffect(() => {
        switch (algo) {
          case 'bubbleSort': {
            setDesc('Bubble Sort');
            break;
          }
          case 'selectionSort': {
            setDesc('Selection Sort');
            break;
          }
          case 'insertionSort': {
            setDesc('Insertion Sort');
            break;
          }
          case 'mergeSort': {
            setDesc('Merge Sort');
            break;
          }
        }
    }, [algo]);

    return (
        <div className={classes.descContainer}>
            <div className={classes.descTitleContainer}>
                <span>{desc}</span>
            </div>
            <span className={`${classes.desc} ${desc==='Bubble Sort'? '' : classes.hiddenDesc}`}>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data-sets as its average and worse-case time complexity is quite high.</span>
            <span className={`${classes.desc} ${desc==='Selection Sort'? '' : classes.hiddenDesc}`}>Selection Sort works by looping through the unsorted portion of the array and finding the next minimum element, inserting it into the front before increasing the starting index and iterating again. This algorithm is not suitable for large data-sets as its average and worse-case time complexity is quite high.</span>
            <span className={`${classes.desc} ${desc==='Insertion Sort'? '' : classes.hiddenDesc}`}>Insertion sort is a simple algorithm that works similar to the way you sort playing cards in your hands. The array is split into sorted and unsorted parts. Values from the unsorted part are picked and shuffled down to its correct position.</span>
            <span className={`${classes.desc} ${desc==='Merge Sort'? '' : classes.hiddenDesc}`}>Merge Sort works by recursively splitting the array into equal halfs until it cannot be further divided. Both halfs are sorted and a merge operation is applied. The merge operation is a process of taking two smaller sorted arrays and combining them into one larger array. This algorithm is very suitable for large data-sets as its average and worst-case time complexity are considered low.</span>
        </div>
    );
}

export default Description;
