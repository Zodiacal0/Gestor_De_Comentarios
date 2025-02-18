import User from "../user/user.model.js";
import Publication from "../publication/publication.model.js";

export const emailExist = async(email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`The email ${email} is already registered`);
    }

};

export const userNameExist = async(userName = "") =>{
    const exist = await User.findOne({userName});
    if(exist){
        throw new Error(`The userName ${userName} is already registered`);
    }

}

export const uidExist = async(uid = "") =>{
    const exist = await User.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }
};

export const uidPublicationExist = async(uid = "") =>{
    const exist = await Publication.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }
};


