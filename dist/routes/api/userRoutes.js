import { Router } from "express";
import { getUsers, createUser, getSingleUser, updateUser, deleteUser, createUserFriend, deleteUserFriend } from "../../controllers/userController.js";
const router = Router();
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(createUserFriend).delete(deleteUserFriend);
export default router;
