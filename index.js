import { filterByRegion } from "./utils.js";
import fs from "fs";

const countries = JSON.parse(fs.readFileSync("countries_data.json", "utf8"));
// console.log(countries);

const region = "CA";
const ca_countries = filterByRegion(countries, "CA");
console.log(ca_countries);
console.log(ca_countries.length);
