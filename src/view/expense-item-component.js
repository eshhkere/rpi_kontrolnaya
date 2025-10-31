import AbstractComponent from '../framework/view/abstract-component.js';
import { CategoryLabels } from '../const.js';

function createExpenseItemTemplate(expense) {
  return `<li>${expense.name} - ${expense.amount} руб. (Категория: ${CategoryLabels[expense.category]}) <button class="delete-btn" data-id="${expense.id}">Удалить</button></li>`;
}

export default class ExpenseItemComponent extends AbstractComponent {
  constructor({expense, onDelete}) {
    super();
    this.expense = expense;
    this.onDelete = onDelete;
    this.#addDeleteHandler();
  }

  get template() {
    return createExpenseItemTemplate(this.expense);
  }

  #addDeleteHandler() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        this.onDelete(this.expense.id);
      }
    });
  }
}

