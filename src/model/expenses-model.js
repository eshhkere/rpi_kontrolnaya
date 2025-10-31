import { expenses } from '../mock/expenses.js';
import { generateID } from '../utils.js';

export default class ExpensesModel {
  #expenses = expenses;

  getExpenses() {
    return this.#expenses;
  }

  addExpense(name, amount, category) {
    const newExpense = {
      id: generateID(),
      name,
      amount: Number(amount),
      category,
    };
    this.#expenses.push(newExpense);
    return newExpense;
  }

  deleteExpense(id) {
    this.#expenses = this.#expenses.filter(expense => expense.id !== id);
  }
}