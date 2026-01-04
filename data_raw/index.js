import { filterByRegion } from "./utils.js";
import fs from "fs";

const regions = JSON.parse(fs.readFileSync("regions_data.json", "utf8"));
const all_countries = JSON.parse(
  fs.readFileSync("countries_data.json", "utf8")
);

Object.keys(regions).forEach((region) => {
  const region_countries = filterByRegion(all_countries, region);
  regions[region].countries = region_countries;
});

console.log(regions);
