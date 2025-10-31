import ExpenseListComponent from '../view/expense-list-component.js';
import ExpenseItemComponent from '../view/expense-item-component.js';
import { render } from '../framework/render.js';

export default class ExpensesPresenter {
  #listContainer = null;
  #expensesModel = null;
  #expenseListComponent = new ExpenseListComponent();

  constructor({listContainer, expensesModel}) {
    this.#listContainer = listContainer;
    this.#expensesModel = expensesModel;
  }

  init() {
    render(this.#expenseListComponent, this.#listContainer);
    this.#renderExpenses();
  }

  addExpense(name, amount, category) {
    this.#expensesModel.addExpense(name, amount, category);
    this.#renderExpenses();
  }

  deleteExpense(id) {
    this.#expensesModel.deleteExpense(id);
    this.#renderExpenses();
  }

  #renderExpenses() {
    const container = this.#expenseListComponent.element;
    container.innerHTML = ''; 
    const expenses = this.#expensesModel.getExpenses();
    expenses.forEach(expense => {
      const expenseComponent = new ExpenseItemComponent({
        expense,
        onDelete: this.deleteExpense.bind(this)
      });
      render(expenseComponent, container);
    });
  }
}