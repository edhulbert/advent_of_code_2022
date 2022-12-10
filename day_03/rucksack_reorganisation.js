import { readFileSync } from "fs";

const filename = './day_03/input1.txt';

const syncReadFile = (filename) => {
    const contents = readFileSync(filename, 'utf-8');
    const array = contents.split(/\r?\n/);

    return array;
}

const convertToPriority = (letter) => {
    const utf16Value = letter.charCodeAt(0);
    if (utf16Value >= 97 && utf16Value <= 122) {
        return utf16Value - 96;
    } else {
        return utf16Value - 38;
    }
}

const findDuplicates = (rucksack) => {
    for (let i = 0; i < rucksack.length / 2; i++) {
        for (let j = rucksack.length / 2; j < rucksack.length; j++) {
            if (rucksack.charAt(i) == rucksack.charAt(j)) {
                return rucksack.charAt(i);
            }
        }
    }
}

const rucksack_reorganisation = (filename) => {
    const rucksacks = syncReadFile(filename);
    let totalPriority = 0;

    for (let i = 0; i < rucksacks.length; i++) {
        totalPriority += convertToPriority(findDuplicates(rucksacks[i]));
    }

    return totalPriority;

}

console.log(rucksack_reorganisation(filename));