
export default class Test {
    constructor(no, questIdsAr) {
        this.no = no;
        this.questIdsAr = questIdsAr;
    }

    getNumberOfTest() {
        return this.no;
    }

    getLabelOfTest() {
        return 'Test' + this.no;
    }

    bufferNewQuestsAr(newAr) {
        console.log('checking ...')
    }
}
