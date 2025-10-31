import AbstractComponent from '../framework/view/abstract-component.js';

function createExpenseListTemplate() {
  return `<ul id="expense-list"></ul>`;
}

export default class ExpenseListComponent extends AbstractComponent {
  get template() {
    return createExpenseListTemplate();
  }
}