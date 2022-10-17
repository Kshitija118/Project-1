export function getRndmFromSet(set) {
    let rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
}
