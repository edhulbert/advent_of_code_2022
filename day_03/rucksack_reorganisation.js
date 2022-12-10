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

const findBadge = (rucksack1, rucksack2, rucksack3) => {
    let letters = new Set();

    for (let i = 0; i < rucksack1.length; i++) {
        letters.add(rucksack1.charAt(i));
    }

    for (let i = 0; i < rucksack2.length; i++) {
        if (letters.has(rucksack2.charAt(i)) && rucksack3.includes(rucksack2.charAt(i))) {
            return rucksack2.charAt(i);
        }
    }
}

const findAuthKeys = (filename) => {
    const rucksacks = syncReadFile(filename);
    let totalPriority = 0;

    for (let i = 0; i < rucksacks.length; i += 3) {
        totalPriority += convertToPriority(findBadge(rucksacks[i], rucksacks[i+1], rucksacks[i+2]))
    }
    return(totalPriority);
}
console.log(findAuthKeys(filename));