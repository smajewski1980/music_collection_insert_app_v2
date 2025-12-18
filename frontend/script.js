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
      console.log("records");
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
  getMostCurrentLoc(recordsLocs, "records");
  getMostCurrentLoc(cdsLocs, "cds");
  getMostCurrentLoc(cdSinglesLocs, "cdSingles");
  getMostCurrentLoc(cdCompsLocs, "cdComps");
  console.log(currTapeLoc);
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
