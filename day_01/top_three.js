import { readFileSync, promises as fsPromises } from 'fs';
import { createSecureContext } from 'tls';

const inputFile = 'input.txt';

const asyncReadFile = async (filename) => {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        const arr = contents.split(/\r?\n/);

        return arr;
    } catch (err) {
        console.log(err);
    }

}

const checkIfTopThree = (num, arr) => {
    console.log(arr);
    if (num >= arr[0]) {
        arr[2] = arr[1];
        arr[1] = arr[0];
        arr[0] = num;
    } else if (num >= arr[1]) {
        arr[2] = arr[1];
        arr[1] = num;
    } else if (num > arr[2]) {
        arr[2] = num;
    }
    return arr;
}

const findTopThree = async (filename) => {
    try {
        let topThree = [0, 0, 0];
        let currentCalories = 0;
        let total = 0;

        const input = await asyncReadFile(filename);

        for (let i = 0; i < input.length; i++) {
            if (input[i] == '') {
                topThree = checkIfTopThree(currentCalories, topThree);
                currentCalories = 0;
            } else {
                currentCalories += +input[i];
            }
        }

        total = topThree.reduce((acc, value) => acc += +value, 0);
        return total;
    } catch (err) {
        console.log(err);
    }
}

const total = await findTopThree(inputFile);

console.log("total is: " + total);
