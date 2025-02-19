import {Schema, model} from "mongoose";

const commentSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "Author is required"],
    },
    content:{
        type: String,
        required: [true, "Content is required"],
    },
    publication: {
        type: Schema.Types.ObjectId,
        required: [true, "Publication is required"]
    },
    status: {
        type: Boolean,
        default: true,
    },
},

{
    versionKey: false,
    timeStamps: true
});

commentSchema.methods.toJSON = function(){
    const {_v, password, _id, ...comment} = this.toObject()
    comment.uid = _id;
    return comment;
};

export default model("Comment", commentSchema);