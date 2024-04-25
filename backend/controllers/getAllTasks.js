const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getAllTasks = async (req, res) => {
  try {
    const query = `
      SELECT 
        t.title,
        t.description,
        u_assigned.firstName AS assigned_to,
        u_assigned_by.assignerName AS assigned_by,  -- Include the name of the user who assigned the task
        p.priority_name AS priority,
        s.status_name AS progress,
        t.due_date,
        t.execution_date
      FROM 
        tasks t
      JOIN 
        users u_assigned ON t.assignee_id = u_assigned.user_id  -- Join users table to get assignee's name
      JOIN 
        users u_assigned_by ON t.assigned_by_id = u_assigned_by.user_id  -- Join users table to get assigned by's name
      JOIN 
        priorities p ON t.priority_id = p.priority_id
      JOIN 
        statuses s ON t.status_id = s.status_id
    `;
    
    const tasks = await sequelize.query(query, {
      type: QueryTypes.SELECT
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching all tasks:', err);
    res.status(500).send('Server error');
  }
};


module.exports = {
  getAllTasks
};
