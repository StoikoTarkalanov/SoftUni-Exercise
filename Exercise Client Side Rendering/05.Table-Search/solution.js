import { html, render } from './node_modules/lit-html/lit-html.js';

const rowTempalte = (student, select) => html`
<tr class=${select ? 'select'  : '' }>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`;

const tbody = document.querySelector('tbody');
const input = document.getElementById('searchField');
start();

async function start() {
   document.getElementById('searchBtn').addEventListener('click', () => {
         update(list, input.value);
   });

   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const list = Object.values(data);

   update(list);
}

function update(list, match = '') {
   // console.log(match);
   const result = list.map(x =>  rowTempalte(x, compare(x, match)));
   render(result, tbody);
}

function compare(item, match) {
   // console.log(match);
   return Object.values(item).some(x => match && x.toLowerCase().includes(match));
}