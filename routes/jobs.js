const express = require('express');
const router = express.Router();
const {
    CreateJob,
    GetAllJObs,
    GetSingleJob,
    UpdateJob,
    deleteJob
} = require('../controllers/jobs');




router.route('/').post(CreateJob);
router.route('/').get(GetAllJObs);
router.route('/:id').get(GetSingleJob);
router.route('/:id').patch(UpdateJob);
router.route('/:id').delete(deleteJob);


module.exports = router;