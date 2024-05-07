const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterListSchema = new Schema({
    string: {
        required: true,
        type: String
    },
    kDefinition: {
        required: true,
        type: String
    },
    kMandarin: {
        required: true,
        type: String
    }
}, {collection: 'CharacterList'});

const CharacterList = mongoose.model('CharacterList', characterListSchema);
module.exports = CharacterList;