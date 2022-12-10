import { readFileSync, promises as fsPromises } from 'fs';

const filename = './day_02/input.txt';

const asyncReadFile = async (filename) => {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        const arr = contents.split(/\r?\n/);

        return arr;
    } catch (err) {
        console.log(err);
    }
}



const stringToRPS = async (rpsRoundString) => {
    return [rpsRoundString.charAt(0), rpsRoundString.charAt(2)];
}

const points = (oppMove, desiredOutcome) => {
    let points = 0;
    if (desiredOutcome == "X") {
        if (oppMove == "A") points += 3;
        if (oppMove == "B") points += 1;
        if (oppMove == "C") points += 2;
    } else if (desiredOutcome == "Y") {
        points += 3;
        if (oppMove == "A") points += 1;
        if (oppMove == "B") points += 2;
        if (oppMove == "C") points += 3;
    } else {
        points += 6;
        if (oppMove == "A") points += 2;
        if (oppMove == "B") points += 3;
        if (oppMove == "C") points += 1;
    }
    return points;
}

const rockPaperScissors = async (filename) => {
    try {
        let total = 0;

        const inputPairs = await asyncReadFile(filename);

        for (let i = 0; i < inputPairs.length; i++) {

            const [oppMove, desiredOutcome] = await stringToRPS(inputPairs[i]);
            total += points(oppMove, desiredOutcome);
        }


        return total;

    } catch (err) {
        console.log(err);
    }
}

const total = await rockPaperScissors(filename);
console.log(total);