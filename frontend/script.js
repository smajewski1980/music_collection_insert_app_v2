function customSort(a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function getMostCurrentSubLoc(array) {
  const misc = [];
  const classical = [];
  const comedy = [];
  const country = [];
  const jazz = [];
  const unopened = [];
  const pop = [];
  const soundtracks = [];
  const various = [];
  // sort out by category
  array.forEach((loc) => {
    currLoc = loc.split(" ")[1];
    if (currLoc === "Classical") {
      classical.push(loc);
    } else if (currLoc === "Country") {
      country.push(loc);
    } else if (currLoc === "Comedy") {
      comedy.push(loc);
    } else if (currLoc === "Jazz") {
      jazz.push(loc);
    } else if (currLoc === "NEW") {
      unopened.push(loc);
    } else if (currLoc === "Pop/Rock") {
      pop.push(loc);
    } else if (currLoc === "Soundtracks") {
      soundtracks.push(loc);
    } else if (currLoc === "Various") {
      various.push(loc);
    } else {
      misc.push(loc);
    }
  });

  // get current vals
  const currClassical = classical.sort(customSort);
  const currCountry = country.sort(customSort);
  const currComedy = comedy.sort(customSort);
  const currJazz = jazz.sort(customSort);
  const currUnopened = unopened.sort(customSort);
  const currPop = pop.sort(customSort);
  const currSoundtracks = soundtracks.sort(customSort);
  const currVarious = various.sort(customSort);

  // return array with the vals
  return [
    currClassical.at(-1),
    currCountry.at(-1),
    currComedy.at(-1),
    currJazz.at(-1),
    currUnopened.at(-1),
    currPop.at(-1),
    currSoundtracks.at(-1),
    currVarious.at(-1),
    ...misc,
  ];
}

function getMostCurrentRecordsLoc(array) {
  const rec45s = [];
  const rec33s = [];
  const rec78s = [];
  const misc = ["Herb Alpert Records", '12" Singles']; //<-- when we switch over to this app, we will change the name of the loc to start with 33s in the db
  // distibute the values to the appropriate array
  array.forEach((loc) => {
    if (loc.location.includes("45s ")) {
      rec45s.push(loc.location);
    }
    if (loc.location.includes("33s ")) {
      rec33s.push(loc.location);
    }
    if (loc.location.includes("78s ")) {
      rec78s.push(loc.location);
    }
  });

  // sort the sortables and get currents
  const sorted45s = rec45s.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  const sorted78s = rec78s.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  const curren33sLocs = getMostCurrentSubLoc(rec33s);
  const current45sLoc = sorted45s.at(-1);
  const current78sLoc = sorted78s.at(-1);

  return [...curren33sLocs, current45sLoc, current78sLoc, ...misc];
}

function getMostCurrentTapeLoc(array) {
  const eightTracks = [];
  const reelToReel = [];
  const cassettes = [];
  // distribute the values to the appropriate array
  array.forEach((loc) => {
    if (loc.location.includes("8-Track")) {
      eightTracks.push(loc.location);
    }
    if (loc.location.includes("Reel")) {
      reelToReel.push(loc.location);
    }
    if (loc.location.includes("Cassette")) {
      cassettes.push(loc.location);
    }
  });

  // sort the arrays
  const sortedEightTracks = eightTracks.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  const sortedReelToReel = reelToReel.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  const sortedCassettes = cassettes.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  // set the highest value as current
  const currEightLoc = sortedEightTracks.at(-1);
  const currReelLoc = sortedReelToReel.at(-1);
  const currCassLoc = sortedCassettes.at(-1);
  return [currEightLoc, currCassLoc, currReelLoc];
}

function getMostCurrentLoc(array, format) {
  switch (format) {
    case "tapes":
      return getMostCurrentTapeLoc(array);
      break;
    case "records":
      return getMostCurrentRecordsLoc(array);
      break;
    case "cds":
      console.log("cds");
      break;
    case "cdSingles":
      console.log("cd singles");
      break;
    case "cdComps":
      console.log("cd comps");
      break;
    default:
      break;
  }
}

function processLocations(data) {
  const tapesLocs = data.tapes;
  const recordsLocs = data.records;
  const cdsLocs = data.cds;
  const cdCompsLocs = data.cdComps;
  const cdSinglesLocs = data.cdSingles;
  const currTapeLoc = getMostCurrentLoc(tapesLocs, "tapes");
  const currRecordsLocs = getMostCurrentLoc(recordsLocs, "records");
  getMostCurrentLoc(cdsLocs, "cds");
  getMostCurrentLoc(cdSinglesLocs, "cdSingles");
  getMostCurrentLoc(cdCompsLocs, "cdComps");
  console.log("curr tapes", currTapeLoc); // <--these will be the final result to use for the ui
  console.log("curr records", currRecordsLocs);
}

async function getLocations() {
  try {
    const res = await fetch("/locations");
    const data = await res.json();
    processLocations(data);
  } catch (error) {
    console.log(error);
  }
}

getLocations();
