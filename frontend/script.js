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

// reset all forms to not active
function removeActiveFormClass() {
  forms.forEach((form) => {
    form.classList.remove("active-form");
  });
}

// when a nav button is clicked, show the appropriate form
function handleBtnClick(e) {
  // reset the forms to not active
  removeActiveFormClass();
  // which form to load
  const clicked = e.target.dataset.form;
  // show it
  document.getElementById(clicked).classList.add("active-form");
  // on the initial load, display the increment location option
  incrementWrapper.style.display = "block";
}

// add the listeners to the nav btns
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

async function handleCdCompsForm(e) {
  e.preventDefault();
  const formData = new FormData(cdCompsForm);

  const tracksFull = formData.get("tracks").trim().split("\n");
  const tracksToSend = [];
  tracksFull.forEach((tr) => {
    const track = tr.split("|");
    tracksToSend.push(track);
  });

  const data = {
    title: formData.get("title"),
    year: Number(formData.get("year")),
    location: formData.get("location"),
    tracks: tracksToSend,
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch("/cd-comps", options);
    const resData = await res.json();
    const id = resData.titleId;
    if (id == undefined) {
      throw new Error("oh oh...");
    }
    cdCompsForm.reset();
    return console.log("new item id: ", id);
  } catch (error) {
    console.log(error);
  }
}

// generic func to check the data objects for empty fields
function noEmptyFields(data) {
  for (const key in data) {
    if (!data[key]) {
      return false;
    }
  }
  return true;
}

async function handleRecordsForm(e) {
  e.preventDefault();
  const formData = new FormData(recordsForm);

  const data = {
    artist: formData.get("artist"),
    title: formData.get("title"),
    location: formData.get("location"),
    year: Number(formData.get("year")),
    diameter: formData.get("diameter"),
    sleeve_condition: formData.get("sleeveCondition"),
    record_condition: formData.get("recordCondition"),
    label: formData.get("label"),
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  if (!noEmptyFields(data)) {
    alert("Bitch, fill all them fields out!");
  }

  if (noEmptyFields(data)) {
    try {
      const res = await fetch("/records", options);
      const resData = await res.json();
      recordsForm.reset();
      console.log("new item id: ", resData);
    } catch (error) {
      console.log(error);
    }

    console.log("submitting records form");
  }
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

async function handleCdSinglesForm(e) {
  e.preventDefault();
  const formData = new FormData(cdSinglesForm);

  const trackList = formData.get("tracks").trim().split("\n");

  const data = {
    artist: formData.get("artist"),
    title: formData.get("title"),
    year: Number(formData.get("year")),
    caseType: formData.get("caseType"),
    tracks: trackList,
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch("/cd-singles", options);
    if (res.status !== 201) {
      throw new Error("oh oh...");
    }
    const id = await res.json();
    cdSinglesForm.reset();
    console.log("new item id: ", id);
  } catch (error) {
    console.log(error);
  }
}

// submit listeners on the forms
cdsMainForm.addEventListener("submit", handleCdsMainForm);
cdCompsForm.addEventListener("submit", handleCdCompsForm);
cdSinglesForm.addEventListener("submit", handleCdSinglesForm);
recordsForm.addEventListener("submit", handleRecordsForm);
tapesForm.addEventListener("submit", handleTapesForm);
