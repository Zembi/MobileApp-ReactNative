
export default class Question {
    constructor(id, img, question, answersString, rightAnswIndex, starred, premium) {
        this.iD = id;
        this.img = img;
        this.question = question;
        this.answersString = answersString;
        this.answersAr = this.splitStringToArray(answersString, '_%%_');
        this.rightAnswIndex = rightAnswIndex;
        this.starred = starred;
        this.premium = premium;
    }

    splitStringToArray(string, type) {
        return (string.split(type));
    }
}
