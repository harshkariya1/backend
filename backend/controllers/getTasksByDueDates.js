const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getTasksByDueDates = async (req, res) => {
  try {
    const tasks = await sequelize.query(`
      SELECT 
        t.task_id,
        t.title,
        t.description,
        u.firstName AS assignee,
        p.priority_name AS priority,
        t.due_date,
        t.execution_date,
        u_assigned_by.firstName AS assigned_to,
        u_assigned_by.assignerName AS assigned_by
      FROM 
        tasks t
      JOIN 
        users u ON t.assignee_id = u.user_id
      JOIN 
        priorities p ON t.priority_id = p.priority_id
      JOIN 
        users u_assigned_by ON t.assigned_by_id = u_assigned_by.user_id
      ORDER BY 
        t.due_date ASC;
    `, {
      type: QueryTypes.SELECT
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks by due dates:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getTasksByDueDates
};
