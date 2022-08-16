import { useState, useEffect } from 'react';

import classes from './SortingPage.module.css';

const Description = ({algo}) => {
    const [desc, setDesc] = useState('')

    useEffect(() => {
        switch (algo) {
          case 'bubbleSort': {
            setDesc('BUBBLE SORT');
            break;
          }
          case 'selectionSort': {
            setDesc('SELECTION SORT');
            break;
          }
          case 'insertionSort': {
            setDesc('INSERTION SORT');
            break;
          }
          case 'mergeSort': {
            setDesc('MERGEE SORT');
            break;
          }
        }
    }, [algo]);

    return (
        <div className={classes.descContainer}>
            <p>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data-sets as its average and worse-case time complexity is quite high.</p>
            <p>Selection Sort works by looping through the unsorted portion of the array and finding the next minimum element, inserting it into the front before increasing the starting index and iterating again. This algorithm is not suitable for large data-sets as its average and worse-case time complexity is quite high.</p>
            <p>Insertion sort is a simple algorithm that works similar to the way you sort playing cards in your hands. The array is split into sorted and unsorted parts. Values from the unsorted part are picked and shuffled down to its correct position.</p>
            <p>Merge Sort works by recursively splitting the array into equal halfs until it cannot be further divided. Both halfs are sorted and a merge operation is applied. The merge operation is a process of taking two smaller sorted arrays and combining them into one larger array. This algorithm is very suitable for large data-sets as its average and worst-case time complexity are considered low.</p>
        </div>
    );
}

export default Description;
