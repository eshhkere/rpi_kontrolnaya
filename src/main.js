import ExpensesPresenter from './presenter/expenses-presenter.js';
import ExpensesModel from './model/expenses-model.js';

const listContainer = document.querySelector('.expense-list');
const expensesModel = new ExpensesModel();
const expensesPresenter = new ExpensesPresenter({listContainer, expensesModel});

expensesPresenter.init();