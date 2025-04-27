// routes/projectRoutes.js
import express from 'express';
import {
  getAllProjects,
  createProject,
  getProject,
  addTask,
  updateTaskStatus,
  deleteTask,
  addSubtask
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.post('/:id/tasks', addTask);
router.put('/:id/tasks/:taskId', updateTaskStatus);
router.delete('/:id/tasks/:taskId', deleteTask);
router.post('/:id/tasks/:taskId/subtasks', addSubtask);

export default router;