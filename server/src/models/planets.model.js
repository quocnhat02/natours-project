const { rejects } = require("assert");
const { parse } = require("csv-parse");
const fs = require("fs");
const { resolve } = require("path");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

/* const promise = new Promise((resolve, reject) => {
 resolve(42);
 });
 promise.then((result) => {

 });
 await result = await promise;
 console.log(result);
*/
function loadPlanetsData() {
  return new promises((resolve, rejects) => {
    fs.createReadStream("kepler_data.csv")
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        rejects(error);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found! `);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
