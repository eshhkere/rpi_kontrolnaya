import { expenses } from '../mock/expenses.js';

export default class ExpensesModel {
  #expenses = expenses;

  getExpenses() {
    return this.#expenses;
  }
}