import Publication from "../publication/publication.model.js";
import User from "../user/user.model.js";

export const registerPublication = async(req,res) =>{
    try{
        const data = req.body

        const publication = await Publication.create(data)

        await User.findByIdAndUpdate(data.owner, {$push: {publications: publication._id}}, {new: true})

        return res.status(201).json({
            message: "Publication has been created",
            publication
        })
    }catch(error){
        return res.status(500).json({
            message: "user registration failed",
            error: error.message
        })
    }
}


export const getPublicationById = async (req, res) => {
    try{
        const { uid } = req.params;
        const publication = await Publication.findById(uid)

        if(!publication){
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }

        return res.status(200).json({
            success: true,
            publication
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicación",
            error: err.message
        })
    }
}

export const getPublication = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, publication ] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            publication
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        })
    }
}

export const deletePublication = async (req, res) => {
    try {

        const { uid } = req.params;
        const publication = await Publication.findById(uid);
        const userId = publication.owner;

        if (!publication) {
            return res.status(404).json({
                message: "Category not found" 
            });
        }

        await Publication.findByIdAndUpdate(uid, { status: false }, { new: true });
        await User.findByIdAndUpdate(userId, { $pull: { publications: uid } }, { new: true });

        return res.status(200).json({ 
            message: "Publication deleted successfully" 
        });

    } catch (error) {
        return res.status(500).json({
            message: "Delete publication failed",
            error: error.message
        });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { uid } = req.params;
        const  {title, category, publicationContent}  = req.body;

        const publication = await Publication.findByIdAndUpdate(uid, {title: title, category: category, publicationContent: publicationContent}, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Publicación Actualizada',
            publication,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar publicación',
            error: err.message
        });
    }
}
