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

  #renderExpenses() {
    const expenses = this.#expensesModel.getExpenses();
    expenses.forEach(expense => {
      const expenseComponent = new ExpenseItemComponent({expense});
      render(expenseComponent, this.#expenseListComponent.element);
    });
  }
}