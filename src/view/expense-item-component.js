import AbstractComponent from '../framework/view/abstract-component.js';

function createExpenseItemTemplate(expense) {
  return `<li>${expense.name} - ${expense.amount} руб. (Категория: ${expense.category})</li>`;
}

export default class ExpenseItemComponent extends AbstractComponent {
  constructor({expense}) {
    super();
    this.expense = expense;
  }

  get template() {
    return createExpenseItemTemplate(this.expense);
  }
}