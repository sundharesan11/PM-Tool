// controllers/projectController.js
import Project from '../models/Project.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project({ title: req.body.title });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(404).json({ message: 'Project not found' });
  }
};

export const addTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.tasks.push({ title: req.body.title });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { status } = req.body;
    const project = await Project.findById(id);
    const task = project.tasks.id(taskId);
    task.status = status;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
    try {
      const { id, taskId } = req.params;
  
      // Find the project by ID
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      // Find the task by its ID within the tasks array
      const task = project.tasks.id(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Remove the task from the array
      project.tasks.pull(taskId);
  
      // Save the updated project
      await project.save();
  
      res.json(project); // Return the updated project
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  

export const addSubtask = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { title } = req.body;
    const project = await Project.findById(id);
    const task = project.tasks.id(taskId);
    task.subtasks.push({ title });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

