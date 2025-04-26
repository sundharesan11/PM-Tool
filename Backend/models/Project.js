// models/Project.js
import mongoose from 'mongoose';

const SubtaskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  }
});

const TaskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  subtasks: [SubtaskSchema]
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [TaskSchema]
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
