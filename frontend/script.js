const cdCompsForm = document.getElementById("cd-comps-form");
const cdSinglesForm = document.getElementById("cd-singles-form");
const cdsMainForm = document.getElementById("cd-main-form");
const recordsForm = document.getElementById("records-form");
const tapesForm = document.getElementById("tapes-form");
const btnComps = document.querySelector(".btn-cd-comps");
const btnSingles = document.querySelector(".btn-cd-singles");
const btnMain = document.querySelector(".btn-cd-main");
const btnRecords = document.querySelector(".btn-records");
const btnTapes = document.querySelector(".btn-tapes");
const buttons = [btnComps, btnSingles, btnMain, btnRecords, btnTapes];
const forms = [cdCompsForm, cdSinglesForm, cdsMainForm, recordsForm, tapesForm];
const incrementWrapper = document.querySelector(".increment-wrapper");

function removeActiveFormClass() {
  forms.forEach((form) => {
    form.classList.remove("active-form");
  });
}

function handleBtnClick(e) {
  removeActiveFormClass();
  const clicked = e.target.dataset.form;
  document.getElementById(clicked).classList.add("active-form");
  incrementWrapper.style.display = "block";
}

buttons.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});

async function handleCdsMainForm(e) {
  e.preventDefault();
  const formData = new FormData(cdsMainForm);

  const data = {
    artist: formData.get("artist"),
    title: formData.get("title"),
    location: formData.get("location"),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch("/cds-main", options);
    cdsMainForm.reset();
    console.log("new item id: ", res.body);
  } catch (error) {
    console.log(error);
  }
}
function handleCdCompsForm(e) {
  e.preventDefault();
  console.log("submitting cd comps form");
}
function handleRecordsForm(e) {
  e.preventDefault();
  console.log("submitting records form");
}

async function handleTapesForm(e) {
  e.preventDefault();
  const formData = new FormData(tapesForm);

  const data = {
    artist: formData.get("artist"),
    title: formData.get("title"),
    location: formData.get("location"),
    year: Number(formData.get("year")),
    needsRepair: formData.get("needsRepair"),
    speed: formData.get("tapeSpeed"),
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch("/tapes", options);
    const data = await res.json();
    tapesForm.reset();
    console.log("new item id: ", data);
  } catch (error) {
    console.log(error);
  }
}

function handleCdSinglesForm(e) {
  e.preventDefault();
  console.log("submitting cd singles form");
}

cdsMainForm.addEventListener("submit", handleCdsMainForm);
cdCompsForm.addEventListener("submit", handleCdCompsForm);
cdSinglesForm.addEventListener("submit", handleCdSinglesForm);
recordsForm.addEventListener("submit", handleRecordsForm);
tapesForm.addEventListener("submit", handleTapesForm);
