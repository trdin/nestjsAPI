import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const PhotosSchema = new Schema({
    'name': String,
    'path': String,
    'postedBy': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'views': Number,
    'likes': Array,
    'comments': [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    'timeCreated': {
        type: Date,
    },
    'tags': Array,
    'reports': Array,
});

export interface Photo extends mongoose.Document {
    'name': String,
    'path': String,
    'postedBy': {
        type: string,
        ref: 'user'
    },
    'views': Number,
    'likes': Array<string>,
    'comments': Array<object>,
    'timeCreated': {
        type: Date,
    },
    'tags': Array<string>,
    'reports': Array<string>,
}


