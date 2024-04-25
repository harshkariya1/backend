const editTask = async (req, res) => {
    const taskId = req.params.id; // Extract the task ID from the request parameters
    const { userId } = req.user; // Extract the user ID from the request (assuming you have user authentication middleware)
  
    try {
      // Check if the task exists and if the user is the assigner
      const task = await Task.findOne({ where: { task_id: taskId, assigned_by_id: userId } });
      if (!task) {
        return res.status(404).json({ message: 'Task not found or you are not authorized to edit this task' });
      }
  
      // Update the task details
      await Task.update(req.body, { where: { task_id: taskId } });
  
      // Return success response
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error('Error editing task:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  module.exports = {
    editTask
  };