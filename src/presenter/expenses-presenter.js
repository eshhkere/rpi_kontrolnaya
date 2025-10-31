import ExpenseListComponent from '../view/expense-list-component.js';
import ExpenseItemComponent from '../view/expense-item-component.js';
import { render } from '../framework/render.js';

export default class ExpensesPresenter {
    #listContainer = null;
    #expensesModel = null;
    #expenseListComponent = new ExpenseListComponent();
    #currentCategoryFilter = 'all';
  
    constructor({listContainer, expensesModel}) {
      this.#listContainer = listContainer;
      this.#expensesModel = expensesModel;
    }
  
    init() {
      render(this.#expenseListComponent, this.#listContainer);
      this.#renderExpenses();
      this.#addCategoryFilterListener();
    }
  
    addExpense(name, amount, category) {
      this.#expensesModel.addExpense(name, amount, category);
      this.#renderExpenses();
    }
  
    deleteExpense(id) {
      this.#expensesModel.deleteExpense(id);
      this.#renderExpenses();
    }
  
    #addCategoryFilterListener() {
      const categoryFilter = document.getElementById('category-filter');
      categoryFilter.addEventListener('change', () => {
        this.#currentCategoryFilter = categoryFilter.value;
        this.#renderExpenses();
      });
    }
  
    #renderExpenses() {
      const container = this.#expenseListComponent.element;
      container.innerHTML = '';
      let expenses = this.#expensesModel.getExpenses();
      
      // Фильтр по категории
      if (this.#currentCategoryFilter !== 'all') {
        expenses = expenses.filter(e => e.category === this.#currentCategoryFilter);
      }
      
      expenses.forEach(expense => {
        const expenseComponent = new ExpenseItemComponent({
          expense,
          onDelete: this.deleteExpense.bind(this)
        });
        render(expenseComponent, container);
      });
    }
}