// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasksByStatus } = require('../controllers/getTasksByStatus');
const {getAllTasks} = require('../controllers/getAllTasks')
const {getTasksByDueDates} = require('../controllers/getTasksByDueDates')
const {getTasksByPriority} = require('../controllers/getTasksByPriority')
const {addTask} = require('../controllers/addTask')
const {editTask} = require('../controllers/editTask')
const authMiddleware = require('../middleware/authMiddleware');
// Secure routes with the authentication middleware
router.get('/tasks/status/:status', getTasksByStatus);
router.post('/tasks/add', authMiddleware,addTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/byduedates', getTasksByDueDates);
router.get('/tasks/bypriority', getTasksByPriority);
router.put('/tasks/edit', editTask);
module.exports = router;
