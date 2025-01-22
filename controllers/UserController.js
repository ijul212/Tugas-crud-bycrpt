import bcrypt from 'bcrypt';
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        await User.create({
            ...req.body,
            password: hashedPassword  
        });

        res.status(201).json({ msg: "User Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }

        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}
