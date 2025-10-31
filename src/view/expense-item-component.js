import AbstractComponent from '../framework/view/abstract-component.js';
import { CategoryLabels } from '../const.js';

function createExpenseItemTemplate(expense, isEditing = false) {
  if (isEditing) {
    return `
      <li>
        <input type="text" value="${expense.name}" class="edit-name" />
        <input type="number" value="${expense.amount}" class="edit-amount" />
        <select class="edit-category">
          <option value="Food" ${expense.category === 'Food' ? 'selected' : ''}>Еда</option>
          <option value="Transport" ${expense.category === 'Transport' ? 'selected' : ''}>Транспорт</option>
          <option value="Entertainment" ${expense.category === 'Entertainment' ? 'selected' : ''}>Развлечения</option>
          <option value="Other" ${expense.category === 'Other' ? 'selected' : ''}>Другое</option>
        </select>
        <button class="save-btn">Сохранить</button>
        <button class="cancel-btn">Отмена</button>
      </li>
    `;
  }
  return `<li>${expense.name} - ${expense.amount} руб. (Категория: ${CategoryLabels[expense.category]}) <button class="edit-btn">Редактировать</button> <button class="delete-btn">Удалить</button></li>`;
}

export default class ExpenseItemComponent extends AbstractComponent {
  constructor({expense, onDelete, onUpdate}) {
    super();
    this.expense = expense;
    this.onDelete = onDelete;
    this.onUpdate = onUpdate;
    this.isEditing = false;
    this.#addHandlers();
  }

  get template() {
    return createExpenseItemTemplate(this.expense, this.isEditing);
  }

  #addHandlers() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-btn')) {
        this.#startEdit();
      } else if (event.target.classList.contains('save-btn')) {
        this.#saveEdit();
      } else if (event.target.classList.contains('cancel-btn')) {
        this.#cancelEdit();
      } else if (event.target.classList.contains('delete-btn')) {
        this.onDelete(this.expense.id);
      }
    });
  }

  #startEdit() {
    this.isEditing = true;
    this.element.innerHTML = createExpenseItemTemplate(this.expense, this.isEditing);
  }

  #saveEdit() {
    const name = this.element.querySelector('.edit-name').value.trim();
    const amount = Number(this.element.querySelector('.edit-amount').value);
    const category = this.element.querySelector('.edit-category').value;
    if (name && amount) {
      this.onUpdate(this.expense.id, {name, amount, category});
      this.isEditing = false;
      this.element.innerHTML = createExpenseItemTemplate(this.expense, this.isEditing);
    }
  }

  #cancelEdit() {
    this.isEditing = false;
    this.element.innerHTML = createExpenseItemTemplate(this.expense, this.isEditing);
  }
}