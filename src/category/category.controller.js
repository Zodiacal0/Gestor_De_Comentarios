import Category from "../category/category.model.js"

export const registerCategory = async(req,res) => {
    try {
        const data = req.body;
        const category = await Category.create(data);

        return res.status(201).json({
            message: "La categoría ha sido registrada",
            name: category.name
        });
    } catch(error) {
        return res.status(500).json({
            message: "El registro de la categoría ha fallado",
            error: error.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { uid } = req.params;
        const category = await Category.findById(uid);

        if (!category) {
            return res.status(404).json({
                message: "Categoría no encontrada"
            });
        }

        await Category.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({ 
            message: "Categoría deshabilitada"
        });

    } catch (error) {
        return res.status(500).json({
            message: "La eliminación de la categoría ha fallado",
            error: error.message
        });
    }
};

export const updateCategory = async(req,res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const category = await Category.findById(uid);

        if(!category) {
            return res.status(404).json({
                message: "La categoría no existe",
                error: error.message
            }); 
        }

        const updatedCategory = await Category.findByIdAndUpdate(uid, data, { new: true });
        
        return res.status(200).json({ 
            message: "Categoría actualizada",
            updatedCategory
        });

    } catch(error) {
        return res.status(500).json({
            message: "La actualización de la categoría ha fallado",
            error: error.message
        });
    }
};
