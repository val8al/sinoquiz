
const CharacterList = require('../models/character_list')

const getQuestion = async () => {
    try {
        const charlist = await CharacterList.find();

        const mainQuestionIdx = getRandomInt(0,charlist.length);
        const mainQuestionChar = charlist[mainQuestionIdx].string;

        let options = [null,null,null,null];
        const rightAnswer = getRandomInt(0,4)
        options[rightAnswer] = `${charlist[mainQuestionIdx].kMandarin}: ${charlist[mainQuestionIdx].kDefinition}`;
        charlist[mainQuestionIdx] = null

        for(i=0;i<4;i++){
            if(!options[i]){
                let newOption = charlist[getRandomInt(0,charlist.length)];
                while(!newOption){
                    newIdx = getRandomInt(0,charlist.length)
                    newOption = charlist[newIdx];
                    charlist[newIdx] = null;
                }
                options[i] = `${newOption.kMandarin}: ${newOption.kDefinition}`
            }
        }
        
        return {
            text: "Which meaning best fits this charcter?",
            char: mainQuestionChar,
            options: options,
            correctAnswer: rightAnswer
        };
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

module.exports = getQuestion