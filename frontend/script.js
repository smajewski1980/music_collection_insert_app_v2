const cdCompsForm = document.getElementById("cd-comps-form");
const cdSinglesForm = document.getElementById("cd-singles-form");
const cdMainForm = document.getElementById("cd-main-form");
const recordsForm = document.getElementById("records-form");
const tapesForm = document.getElementById("tapes-form");
const btnComps = document.querySelector(".btn-cd-comps");
const btnSingles = document.querySelector(".btn-cd-singles");
const btnMain = document.querySelector(".btn-cd-main");
const btnRecords = document.querySelector(".btn-records");
const btnTapes = document.querySelector(".btn-tapes");
const buttons = [btnComps, btnSingles, btnMain, btnRecords, btnTapes];
const forms = [cdCompsForm, cdSinglesForm, cdMainForm, recordsForm, tapesForm];

function removeActiveFormClass() {
  forms.forEach((form) => {
    form.classList.remove("active-form");
  });
}

function handleBtnClick(e) {
  removeActiveFormClass();
  const clicked = e.target.dataset.form;
  document.getElementById(clicked).classList.add("active-form");
}

buttons.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});
