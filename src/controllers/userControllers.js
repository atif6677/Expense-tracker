const user = require('../models/userModels');

const addUser = async (req,res)=>{
    try {
        
        const{ expenceAmount, description, category } = req.body;
        const newUser = await user.create({
            expenceAmount,
            description,
            category
        });
        res.status(201).json(newUser);
    } 
    catch (error) {
        res.status(500).json({error})
    }

}


const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
}




const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await user.destroy({
            where: { id }
        });
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}


const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { expenceAmount, description, category } = req.body;
        const updatedUser = await user.update(
            { expenceAmount, description, category },
            { where: { id }, returning: true }
        );
        if (updatedUser[0]) {
            res.status(200).json(updatedUser[1][0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}



module.exports = {
    addUser,
    editUser,
    getAllUsers,
    deleteUser
};