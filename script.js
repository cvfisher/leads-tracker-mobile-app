"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-144b4-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

onValue(referenceInDB, function (snapshot) {
  const snapshotExists = snapshot.exists();
  if (snapshotExists) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
    console.log(leads);
  }
});

inputBtn.addEventListener("click", function () {
  console.log(inputEl.value);
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}
