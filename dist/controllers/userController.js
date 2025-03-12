import User from "../models/userModels.js";
import Thoughts from "../models/thoughtModel.js";
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).json({ message: "No User Found !!" });
            return;
        }
        res.status(200).json(users);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select("-__v")
            .populate("friends")
            .populate("thoughts");
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            res.status(404).json({ message: "No User Created" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: "User Deleted." });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const createUserFriend = async (req, res) => {
    try {
        const friend = await User.findById(req.params.friendId);
        if (!friend) {
            res.status(404).json({ message: "Friend not found" });
            return;
        }
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const deleteUserFriend = async (req, res) => {
    try {
        const friend = await User.findById(req.params.friendId);
        if (!friend) {
            res.status(404).json({ message: "friend not found" });
            return;
        }
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $pull: { friends: req.params.friendId },
        });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json({ message: "Friend Deleted!" });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
