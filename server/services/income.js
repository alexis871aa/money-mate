const Income = require("../models/Income");
const mapIncome = require("../helpers/mapIncome");

async function getIncomes({ page, limit, sortBy, sortOrder, query }) {
  const skip = (page - 1) * limit;
  const sortCriteria = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const incomes = await Income.find(query)
    .sort(sortCriteria)
    .skip(skip)
    .limit(Number(limit));

  const totalCount = await Income.countDocuments(query);

  return {
    incomes: Array.isArray(incomes) ? incomes.map(mapIncome) : [],
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  };
}

async function addIncome(income) {
  try {
    const incomeDb = await Income.create(income);
    return mapIncome(incomeDb);
  } catch (error) {
    throw new Error("Ошибка при добавлении дохода: " + error.message);
  }
}

async function updateIncome(id, updatedData) {
  const updatedIncome = await Income.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return mapIncome(updatedIncome);
}

async function deleteIncome(id) {
  await Income.findByIdAndDelete(id);
}

module.exports = {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
};
