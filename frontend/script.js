import {
  removeActiveFormClass,
  yearFormatIsGood,
  noEmptyFields,
  toasty,
} from "./utils.js";
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

// when a nav button is clicked, show the appropriate form
function handleNavBtnClick(e) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // reset the forms to not active
      removeActiveFormClass(forms);
      // which form to load
      const clicked = e.target.dataset.form;
      // show it
      document.getElementById(clicked).classList.add("active-form");
      // on the initial load, display the increment location option
      incrementWrapper.style.display = "block";
    });
  } else {
    removeActiveFormClass(forms);
    const clicked = e.target.dataset.form;
    document.getElementById(clicked).classList.add("active-form");
    incrementWrapper.style.display = "block";
  }
}

// add the listeners to the nav btns
buttons.forEach((btn) => {
  btn.addEventListener("click", handleNavBtnClick);
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

  // ----- convert track data from a long string to nested arrays
  // the whole string
  const tracksFull = formData.get("tracks").trim().split("\n");
  // initialize to undefined to later test easier for empty tracks field
  let tracksToSend = undefined;

  // loop through and break down each track to array of artist and title
  tracksFull.forEach((tr) => {
    // i use the pipe to split on
    const track = tr.split("|");
    // a good track will have a length of 2
    if (track.length === 2) {
      // if still undefined, create an empty array
      if (!tracksToSend) {
        tracksToSend = [];
      }
      // cleanup and push
      track[0] = track[0].trim();
      track[1] = track[1].trim();
      tracksToSend.push(track);
    } else {
      toasty("Check your track data. Must be <artist>|<title>.", "red");
      return;
    }
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

  if (!noEmptyFields(data)) {
    toasty("All fields must be filled out.", "red");
  }

  if (!yearFormatIsGood(data.year)) {
    toasty("Year must be 4 digits.", "red");
  }

  if (noEmptyFields(data)) {
    try {
      const res = await fetch("/cd-comps", options);
      const resData = await res.json();
      const id = resData.titleId;

      // if no id, print the backend validation errors
      if (id == undefined) {
        for (let i = 0; i < resData.length; i++) {
          console.log(resData[i]); // <-- still need to get errs formated to toast
        }
        return;
      }
      cdCompsForm.reset();
      toasty(
        `${data.title} has been added to the database with id ${id}.`,
        "green",
      );
      return console.log("new item id: ", id);
    } catch (error) {
      toasty(error, "red");
      console.log(error);
    }
  }
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
    // at some point, make custom alerts
    alert("All fields must be filled out.");
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
