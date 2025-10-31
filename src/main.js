import ExpensesPresenter from './presenter/expenses-presenter.js';
import ExpensesModel from './model/expenses-model.js';

const listContainer = document.querySelector('.expense-list');
const expensesModel = new ExpensesModel();
const expensesPresenter = new ExpensesPresenter({listContainer, expensesModel});

const form = document.getElementById('expense-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('expense-name').value.trim();
  const amount = document.getElementById('expense-amount').value;
  const category = document.querySelector('input[name="expense-category"]:checked')?.value;

  if (name && amount && category) {
    expensesPresenter.addExpense(name, amount, category);
    form.reset(); 
  }
});

expensesPresenter.init();