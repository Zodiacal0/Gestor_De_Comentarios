import Comment from "../comment/comment.model.js"
import User from "../user/user.model.js"
import Publication from "../publication/publication.model.js"

export const addComment = async(req,res) =>{
    try{
        const data = req.body

        const comment = await Comment.create(data)

        await User.findByIdAndUpdate(data.author, {$push: {comments: comment._id}}, {new: true})
        await Publication.findByIdAndUpdate(data.publication, {$push: {comments: comment._id}}, {new: true})

        return res.status(201).json({
            message: "Comment has been publicated",
            comment
        })
    }catch(error){
        return res.status(500).json({
            message: "Publication of comment has failed",
            error: error.message
        })
    }
}

export const getUserComments = async (req, res) => {
    try {
        const { uid } = req.params;
        const { desde = 0, limite = 10 } = req.query; 

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const query = { author: uid, status: true };

        const [total, comments] = await Promise.all([
            Comment.countDocuments(query),
            Comment.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            comments
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: err.message
        });
    }
};


export const deleteComment = async (req, res) => {
    try {

        const { uid } = req.params;
        const comment = await Comment.findById(uid);
        const userId = comment.author;
        const publication = comment.publication;

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found" 
            });
        }

        await Comment.findByIdAndUpdate(uid, { status: false }, { new: true });
        await Publication.findByIdAndUpdate(publication, { $pull: { comments: uid } }, { new: true });
        await User.findByIdAndUpdate(userId,{$pull: {comments: uid}}, {new: true})

        return res.status(200).json({ 
            message: "Comment deleted successfully" 
        });

    } catch (error) {
        return res.status(500).json({
            message: "Comment publication failed",
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { uid } = req.params;
        const  {content}  = req.body;

        const comment = await Comment.findByIdAndUpdate(uid,{content: content},{ new: true });

        res.status(200).json({
            success: true,
            msg: "Comentario Actualizado",
            comment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el comentario",
            error: err.message
        });
    }
}