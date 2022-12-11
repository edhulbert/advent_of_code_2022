import { readFileSync } from "fs";

const filename = './day_04/input1.txt';

const syncReadFile = (filename) => {
    const contents = readFileSync(filename, 'utf-8');
    const array = contents.split(/\r?\n/);

    for (let i=0; i<array.length;i++){
        array[i] = array[i].split(/[-,]+/).map(x => +x);
    }

    return array;
}

const findFullOverlap = (filename) => {
    const pairs = syncReadFile(filename);
    let redundantPairs = 0;
    let array;
    for (let i = 0; i < pairs.length; i++) {
        array = pairs[i];
        
        if ((array[3] >= array[1] && array[2] <= array[0]) || (array[3] <= array[1] && array[2] >= array[0])) {
            redundantPairs++;
        }
    }
    return redundantPairs;
}

const findPartialOverlap = (filename) => {
    const pairs = syncReadFile(filename);
    let overlaps = 0;
    let minA,maxA,minB,maxB;

    for (let i = 0; i < pairs.length; i++) {
        [minA,maxA,minB,maxB] = pairs[i];

        if (!(minB > maxA || minA > maxB)) overlaps++;
    }

    return overlaps;
}

console.log(findPartialOverlap(filename));