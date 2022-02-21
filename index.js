var incomingsList = document.querySelector("#incomes");
var outgoingsList = document.querySelector("#outcomes");

var state = {
  nextIdIncome: 1, //NOTE: must match the length of state.incomings array
  nextIdOutcome: 1,
  incomings: [],
  outgoings: [],
};

renderApp();

function renderApp() {
  renderUI();
  renderSumUI();
}

function renderUI() {
  // reset currently rendered
  incomingsList.innerHTML = "";
  outgoingsList.innerHTML = "";

  // create new incomings
  state.incomings.forEach((item) => {
    var liInnerHTML = null;

    if (item.isEditable) {
      liInnerHTML = `
        <div class="item"><i class="fas fa-hand-holding-usd"></i>
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditIncoming" data-id="${item.id}">ZATWIERDŹ</button> 
        <button class="cancelEditIncoming" data-id="${item.id}">ANULUJ</button>
      `;
    } else {
      liInnerHTML = `<i class="fas fa-hand-holding-usd"></i>
        ${item.name} - ${item.amount}zl 
        <button class="edit editIncoming" data-id="${item.id}">EDYTUJ</button>
        <button class="delete deleteIncoming" data-id="${item.id}">USUŃ</button>
      `;
    }
    let newLi = document.createElement("li");
    newLi.dataset.name = item.name;
    newLi.innerHTML = liInnerHTML;
    incomingsList.append(newLi);
  });

  //create new outgoings

  state.outgoings.forEach((item) => {
    var liInnerHTML = null;

    if (item.isEditable) {
      liInnerHTML = `
        <div class="item"><i class="fas fa-hand-holding-usd"></i>
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span> PLN   
        </div>
        <button class="confirmEditOutcoming" data-id="${item.id}">ZATWIERDŹ</button> 
        <button class="cancelEditOutcoming" data-id="${item.id}">ANULUJ</button>
      `;
    } else {
      liInnerHTML = `<i class="fas fa-hand-holding-usd"></i>
        ${item.name} - ${item.amount}zl 
        <button class="edit editOutcome" data-id="${item.id}">EDYTUJ</button>
        <button class="delete deleteOutcome" data-id="${item.id}">USUŃ</button>
      `;
    }
    let newLiOut = document.createElement("li");
    newLiOut.dataset.name = item.name;
    newLiOut.innerHTML = liInnerHTML;
    outgoingsList.append(newLiOut);
  });

  let editIncomings = document.querySelectorAll(".editIncoming");
  editIncomings.forEach((i) => i.addEventListener("click", toggleItemEditable));

  let confirmEditIncomings = document.querySelectorAll(".confirmEditIncoming");
  confirmEditIncomings.forEach((i) => {
    i.addEventListener("click", confirmEditItem);
  });
  let editOutgoings = document.querySelectorAll(".editOutcome");
  editOutgoings.forEach((i) =>
    i.addEventListener("click", toggleItemEditableOut)
  );

  let confirmEditOutgoings = document.querySelectorAll(".confirmEditOutcoming");
  confirmEditOutgoings.forEach((i) => {
    i.addEventListener("click", confirmEditItemOut);
  });

  // add event listener for each edit "Nie" button
  let cancelEditIncomings = document.querySelectorAll(".cancelEditIncoming");
  cancelEditIncomings.forEach((i) => {
    i.addEventListener("click", toggleItemEditable);
  });
  let cancelEditOutgoings = document.querySelectorAll(".cancelEditOutcoming");
  cancelEditOutgoings.forEach((i) => {
    i.addEventListener("click", toggleItemEditableOut);
  });
  // add event listener for each remove button
  let removeIncomings = document.querySelectorAll(".deleteIncoming");
  removeIncomings.forEach((i) => {
    i.addEventListener("click", removeItem);
  });
  let removeOutgoings = document.querySelectorAll(".deleteOutcome");
  removeOutgoings.forEach((i) => {
    i.addEventListener("click", removeItemOut);
  });
}

function renderSumUI() {
  let incomingsSum = document.querySelector(".sumOfIncomes");
  incomingsSum.innerHTML = `SUMA PRZYCHODW: ${sum(state.incomings)} PLN`;
  let outgoingsSum = document.querySelector(".sumOfOutcomes");
  outgoingsSum.innerHTML = `SUMA WYDATKóW: ${sum(state.outgoings)} PLN`;
  
  let howMuchLeft = document.querySelector(".howMuchLeft")
  let sumLeft = sum(state.incomings)-sum(state.outgoings);
    if (sumLeft === 0){
        howMuchLeft.innerHTML = `Bilans wynosi zero`;
      }
      else if (sumLeft > 0){
          howMuchLeft.innerHTML =`Możesz jeszcze wydać ${sumLeft} złotych`;
      }
      else {
        howMuchLeft.innerHTML =`“Bilans jest ujemny. Jesteś na minusie ${sumLeft} złotych”`;
      }  
}

function sum(arr) {
  return arr.reduce((acc, item) => acc + item.amount, 0);
}

// ADD NEW ITEM
var addIncoming = document.querySelector(".addIncomeBtn");
addIncoming.addEventListener("click", addNewIncome);

function addNewIncome(e) {
  e.preventDefault();

  var newName = document.querySelector(".incomeInput");
  var newAmount = document.querySelector(".incomeAmountInput");
  var newItem = {
    id: state.nextIdIncome,
    name: newName.value,
    amount: Number(newAmount.value),
  };
  state.incomings.push(newItem);

  renderApp();
  resetNewForm(newName, newAmount);
  state.nextIdIncome = state.nextIdIncome + 1;
}

var addOutcomes = document.querySelector(".addOutcomeBtn");
addOutcomes.addEventListener("click", addNewOutcome);

function addNewOutcome(e) {
  e.preventDefault();

  var newNameOutcome = document.querySelector(".outcomeInput");
  var newAmountOutcome = document.querySelector(".outcomeAmountInput");
  var newItemOutcome = {
    id: state.nextIdOutcome,
    name: newNameOutcome.value,
    amount: Number(newAmountOutcome.value),
  };
  state.outgoings.push(newItemOutcome);

  renderApp();
  resetNewForm(newNameOutcome, newAmountOutcome);
  state.nextIdOutcome = state.nextIdOutcome + 1;
}

// MAKE AN ITEM EDITABLE OR NOT

function toggleItemEditable(e) {
  var id = Number(e.target.dataset.id); //number
  state.incomings = state.incomings.map((i) =>
    i.id === id ? { ...i, isEditable: !i.isEditable } : i
  );

  renderApp();
}
function toggleItemEditableOut(e) {
  var id = Number(e.target.dataset.id); //number
  state.outgoings = state.outgoings.map((i) =>
    i.id === id ? { ...i, isEditable: !i.isEditable } : i
  );

  renderApp();
}

// CONFIRM EDITING AN ITEM

function confirmEditItem(e) {
  var id = Number(e.target.dataset.id);
  var spans = document.querySelectorAll(`div.item span[data-id="${id}"]`); //array of <span>
  var newName = spans[0].innerText; //string
  var newAmount = Number(spans[1].innerText); //number
  state.incomings = state.incomings.map((i) =>
    i.id === id
      ? { ...i, name: newName, amount: newAmount, isEditable: false }
      : i
  );

  renderApp();
}
function confirmEditItemOut(e) {
  var id = Number(e.target.dataset.id);
  var spans = document.querySelectorAll(`div.item span[data-id="${id}"]`); //array of <span>
  var newName = spans[0].innerText; 
  var newAmount = Number(spans[1].innerText);
  state.outgoings = state.outgoings.map((i) =>
    i.id === id
      ? { ...i, name: newName, amount: newAmount, isEditable: false }
      : i
  );
  renderApp();
}

// removing item
function removeItem(e) {
  e.preventDefault();

  const idToRemove = Number(e.target.dataset.id);
  // console.log(e.target.dataset.id)
  state.incomings = state.incomings.filter((i) => i.id !== idToRemove);

  renderApp();
}

function removeItemOut(e) {
  e.preventDefault();
  const idToRemove = Number(e.target.dataset.id);
  state.outgoings = state.outgoings.filter((i) => i.id !== idToRemove);

  renderApp();
}

function resetNewForm(name, amount) {
  name.value = "";
  amount.value = "";
}
