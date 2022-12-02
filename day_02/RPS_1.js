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
    return [ rpsRoundString.charAt(0), rpsRoundString.charAt(2) ];
}

const winningMove = (oppMove) => {
    if (oppMove == "A") return "Y";
    if (oppMove == "B") return "Z";
    if (oppMove == "C") return "X";
}

const drawingMove = (oppMove) => {
    if (oppMove == "A") return "X";
    if (oppMove == "B") return "Y";
    if (oppMove == "C") return "Z";
}

const points = (oppMove, myMove) => {
    let points = 0;
    if (myMove == "X") {
        points += 1;
    } else if (myMove == "Y") {
        points += 2;
    } else {
        points += 3;
    }

    if (myMove == winningMove(oppMove)) points += 6;
    if (myMove == drawingMove(oppMove)) points += 3;

    return points;

}

const rockPaperScissors = async (filename) => {
    try {
        let total = 0;
        let oppMove;
        let myMove;
        
        console.log("about to start reading file to array");
        const inputPairs = await asyncReadFile(filename);
        console.log("finished reading files to array");

        for (let i = 0; i < inputPairs.length; i++) {
            [oppMove, myMove] = await stringToRPS(inputPairs[i]);
            total += points(oppMove, myMove);
        }
        return total;
    } catch (err) {
        console.log(err);
    }
}

const total = await rockPaperScissors(filename);
console.log(total);