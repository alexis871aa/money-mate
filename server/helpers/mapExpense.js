module.exports = function (expense) {
  return {
    id: expense._id,
    title: expense.title,
    amount: expense.amount,
    type: expense.type,
    category: expense.category,
    description: expense.description,
    date: expense.date,
  };
};
