// abstracted utility functions

import Toastify from "./node_modules/toastify-js/src/toastify-es.js";

// reset all forms to not active
export function removeActiveFormClass(forms) {
  forms.forEach((form) => {
    form.classList.remove("active-form");
  });
}

// frontend validation for the year field, did this way to use toastify instead of user-agent message
export function yearFormatIsGood(year) {
  const regex = /^[0-9]{4}$/;
  return regex.test(year);
}

// check the data objects for empty vals
export function noEmptyFields(data, tracksTrigger) {
  if (tracksTrigger && !data.tracks) {
    return false;
  }

  for (const key in data) {
    if (!data[key]) {
      return false;
    }
  }
  return true;
}

// our toast config function
export function toasty(msg, color) {
  let bg;

  if (color === "red") {
    bg = "rgb(182, 97, 97)";
  }
  if (color === "green") {
    bg = "rgb(98, 148, 98)";
  }
  if (!bg) {
    bg = color;
  }

  Toastify({
    text: msg,
    duration: 5000,
    gravity: "bottom",
    style: {
      background: bg,
    },
  }).showToast();
}

// trim singles track titles
export function trimTracks(arr) {
  const trimmed = [];
  arr.forEach((tr) => trimmed.push(tr.trim()));
  return trimmed;
}
