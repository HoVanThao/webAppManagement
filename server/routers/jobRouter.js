import { Router } from 'express';
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js';
import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    showStats,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);

// router.route('/').get(getAllJobs).post(createJob);
// router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);
const router = Router();
router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
    .route('/:id')
    .get(validateIdParam, getJob)
    .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
    .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;