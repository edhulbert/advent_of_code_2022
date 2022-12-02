import { readFileSync, promises as fsPromises } from 'fs';
import { createSecureContext } from 'tls';

const inputFile = 'input.txt';

const syncReadFile = async (filename) => {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        const arr = contents.split(/\r?\n/);

        return arr;
    } catch (err) {
        console.log(err);
    }

}

const countCalories = async (filename) => {

    try {
        const calorieList = await syncReadFile(filename);

        let maxCalories = 0;
        let currentCalories = 0;
        for (let i = 0; i < calorieList.length; i++) {
            if (calorieList[i] == "") {
                if (currentCalories > maxCalories) {
                    console.log(calorieList[i-1]);
                    maxCalories = currentCalories;
                    currentCalories = 0;
                } else {
                    currentCalories = 0;
                }
            } else {
                currentCalories += +calorieList[i];
            }
        }
        return maxCalories;
    } catch (err) {
        console.log(err);
    }


}

const output = await countCalories(inputFile);
console.log(output);
