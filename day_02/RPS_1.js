import { readFileSync, promises as fsPromises } from 'fs';

const filename = 'input.txt';

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
    return +rpsRoundString.charAt(0), +rpsRoundString.charAt(2);
}

const rockPaperScissors = async (filename) => {
    try {
        let total = 0;
        let oppMove;
        let myMove;

        const inputPairs = await asyncReadFile(filename);

        for (let i = 0; i < inputPairs.length; i++) {
            oppMove, myMove = await stringToRPS(inputPairs[i]);
            if (i = 0) console.log(oppMove + " " + myMove);
        }
        console.log(inputPairs);
    } catch (err) {
        console.log(err);
    }
}

const runner = async () => {
    await rockPaperScissors(filename);
}

runner();