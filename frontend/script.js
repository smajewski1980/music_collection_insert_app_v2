import {
  removeActiveFormClass,
  yearFormatIsGood,
  noEmptyFields,
  toasty,
  trimTracks,
  handleIncrementReset,
  incrementCheckbox,
  handleCheckbox,
  incrementLocationSwitch,
  trimDataFields,
  addToSessionList,
  focusFirstField,
  handleThemeChange,
} from "./utils.js";
import { getLocations } from "./getCurrentLocations.js";
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
const sessionListWrapper = document.querySelector(".session-list-wrapper");
const sessionList = document.getElementById("session-list");
let showSessionList = false;
const themeToggleSwitch = document.getElementById("theme-toggle");

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
    body: JSON.stringify(trimDataFields(data)),
  };

  if (!noEmptyFields(data, true)) {
    toasty("All fields must be filled out.", "red");
    return;
  }

  if (!yearFormatIsGood(data.year)) {
    toasty("Year must be 4 digits.", "red");
    return;
  }

  if (noEmptyFields(data, true)) {
    try {
      const res = await fetch("/cd-comps", options);

      if (res.status === 400) {
        const errs = await res.json();
        errs.forEach((er) => {
          toasty(`Value: ${er.value} ; Message: ${er.msg}`, "red");
          console.log(`Value: ${er.value} ; Message: ${er.msg}`);
        });
        return;
      }

      if (res.status === 201) {
        const resData = await res.json();
        const id = resData.titleId;

        cdCompsForm.reset();
        toasty(
          `${data.title} has been added to the database with id ${id}.`,
          "green",
        );

        if (incrementLocationSwitch()) {
          await getLocations();
          handleIncrementReset();
        }

        if (!showSessionList) {
          showSessionList = true;
          sessionListWrapper.style.display = "block";
        }

        // add item data to the session list
        const sessionListStr = `id: ${id} ${data.title} was added to cd comps`;
        addToSessionList(sessionList, sessionListStr, "cd-comp-color");
        focusFirstField(cdCompsForm);
        console.log("new item id: ", id);
      }
    } catch (error) {
      toasty(error, "red");
      console.log(error);
    }
  }
}

async function handleCdSinglesForm(e) {
  e.preventDefault();
  // get the form data
  const formData = new FormData(cdSinglesForm);
  // break down the tracks string to an array, each track gets trimmed later
  const trackList = formData.get("tracks").trim().split("\n");

  const data = {
    artist: formData.get("artist"),
    title: formData.get("title"),
    year: Number(formData.get("year")),
    caseType: formData.get("caseType"),
    tracks: trimTracks(trackList),
  };

  if (!noEmptyFields(data, true)) {
    toasty("All fields must be filled out.", "red");
    return;
  }

  if (!yearFormatIsGood(data.year)) {
    toasty("Year must be 4 digits", "red");
    return;
  }

  // if only the tracks are empty
  if (!trackList[0] && noEmptyFields(data, true)) {
    toasty("Please add some tracks.", "red");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(trimDataFields(data)),
  };

  if (noEmptyFields(data, true)) {
    try {
      const res = await fetch("/cd-singles", options);

      if (res.status === 400) {
        const errs = await res.json();
        errs.forEach((er) => {
          toasty(`Value: ${er.value} ; Message: ${er.msg}`, "red");
          console.log(`Value: ${er.value} ; Message: ${er.msg}`);
        });
        return;
      }

      if (res.status === 201) {
        const id = await res.json();
        cdSinglesForm.reset();
        focusFirstField(cdSinglesForm);
        toasty(
          `${data.artist} - ${data.title} was added to the database with id: ${id}`,
          "green",
        );

        console.log("new item id: ", id);

        if (!showSessionList) {
          showSessionList = true;
          sessionListWrapper.style.display = "block";
        }

        // add item data to the session list
        const sessionListStr = `id: ${id} ${data.artist} - ${data.title} was added to cd singles.`;
        addToSessionList(sessionList, sessionListStr, "cd-single-color");
        // these locations are fixed and will not be incremented
      }
    } catch (error) {
      toasty(error, "red");
      console.log(error);
    }
  }
}

async function handleCdsMainForm(e) {
  e.preventDefault();
  const formData = new FormData(cdsMainForm);

  const data = {
    artist: formData.get("artist"),
    title: formData.get("title"),
    location: formData.get("location"),
  };

  if (!noEmptyFields(data, false)) {
    toasty("All fields must be filled out.", "red");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trimDataFields(data)),
  };

  try {
    const res = await fetch("/cds-main", options);

    if (res.status === 400) {
      const errs = await res.json();
      errs.forEach((er) => {
        toasty(`Value: ${er.value} ; Message: ${er.msg}`, "red");
        console.log(`Value: ${er.value} ; Message: ${er.msg}`);
      });
      return;
    }

    if (res.status === 201) {
      const resData = await res.json();
      toasty(
        `${data.artist} - ${data.title} has been added to the database with id: ${resData}`,
        "green",
      );

      cdsMainForm.reset();
      focusFirstField(cdsMainForm);
      console.log("new item id: ", resData);

      if (incrementLocationSwitch()) {
        await getLocations();
        handleIncrementReset();
      }

      if (!showSessionList) {
        showSessionList = true;
        sessionListWrapper.style.display = "block";
      }

      // add item data to the session list
      const sessionListStr = `id: ${resData} ${data.artist} - ${data.title} was added to cds main.`;
      addToSessionList(sessionList, sessionListStr, "cds-main-color");
    }
  } catch (error) {
    toasty(error, "red");
    console.log(error);
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

  if (!noEmptyFields(data, false)) {
    toasty("All fields must be filled out.", "red");
    console.log("All fields must be filled out.");
    return;
  }

  if (!yearFormatIsGood(data.year)) {
    toasty("Year must be 4 digits", "red");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(trimDataFields(data)),
  };

  if (noEmptyFields(data, false)) {
    try {
      const res = await fetch("/records", options);

      if (res.status === 400) {
        const errs = await res.json();
        errs.forEach((er) => {
          toasty(`Value: ${er.value} ; Message: ${er.msg}`, "red");
          console.log(`Value: ${er.value} ; Message: ${er.msg}`);
        });
        return;
      }

      if (res.status === 201) {
        const resData = await res.json();
        recordsForm.reset();
        focusFirstField(recordsForm);
        toasty(
          `${data.artist} - ${data.title} has been added to the database with id: ${resData}`,
          "green",
        );

        console.log("new item id: ", resData);

        if (incrementLocationSwitch()) {
          await getLocations();
          handleIncrementReset();
        }

        if (!showSessionList) {
          showSessionList = true;
          sessionListWrapper.style.display = "block";
        }

        // add item data to the session list
        const sessionListStr = `id: ${resData} ${data.artist} - ${data.title} was added to records.`;
        addToSessionList(sessionList, sessionListStr, "record-color");
      }
    } catch (error) {
      toasty(error, "red");
      console.log(error);
    }
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

  if (!noEmptyFields(data, false)) {
    toasty("All fields must be filled out.", "red");
    console.log("All fields must be filled out.");
    return;
  }

  if (!yearFormatIsGood(data.year)) {
    toasty("Year must be 4 digits", "red");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(trimDataFields(data)),
  };

  if (noEmptyFields(data, false)) {
    try {
      const res = await fetch("/tapes", options);

      if (res.status === 400) {
        const errs = await res.json();
        errs.forEach((er) => {
          toasty(`Value: ${er.value} ; Message: ${er.msg}`, "red");
          console.log(`Value: ${er.value} ; Message: ${er.msg}`);
        });
        return;
      }

      if (res.status === 201) {
        const resData = await res.json();

        tapesForm.reset();
        focusFirstField(tapesForm);
        toasty(
          `${data.artist} - ${data.title} has been added to the database with id: ${resData}`,
          "green",
        );

        if (incrementLocationSwitch()) {
          await getLocations();
          handleIncrementReset();
        }

        console.log("new item id: ", resData);

        if (!showSessionList) {
          showSessionList = true;
          sessionListWrapper.style.display = "block";
        }

        // add item data to the session list
        const sessionListStr = `id: ${resData} ${data.artist} - ${data.title} was added to tapes.`;
        addToSessionList(sessionList, sessionListStr, "tape-color");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// add the listeners to the nav btns
buttons.forEach((btn) => {
  btn.addEventListener("click", handleNavBtnClick);
});

// if the increment checkbox is checked and then the location is changed
const selects = document.querySelectorAll("select");
selects.forEach((sel) => {
  sel.addEventListener("change", handleIncrementReset);
});

// submit listeners on the forms
cdsMainForm.addEventListener("submit", handleCdsMainForm);
cdCompsForm.addEventListener("submit", handleCdCompsForm);
cdSinglesForm.addEventListener("submit", handleCdSinglesForm);
recordsForm.addEventListener("submit", handleRecordsForm);
tapesForm.addEventListener("submit", handleTapesForm);
incrementCheckbox.addEventListener("change", () => {
  handleCheckbox(forms);
});

themeToggleSwitch.addEventListener("change", handleThemeChange);

// slider
const planSlider = document.getElementById("plan-slider");
const slide = document.getElementById("slide");
let billingFrequency = "monthly";

function handleBillingFrequency() {
  if (billingFrequency === "monthly") {
    billingFrequency = "yearly";
    slide.style.right = ".125rem";
  } else {
    billingFrequency = "monthly";
    slide.style.right = "1.125rem";
  }
}

planSlider.addEventListener("click", handleBillingFrequency);
