import {Router} from 'express';
import { getThoughts, createThoughts, getSingleThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';
const router = Router();

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

export default router;