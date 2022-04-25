import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import searchStore from "../store/SearchStore";
import { request, gql } from "graphql-request";
import { PlanetInterface } from "../store/PlanetStore";

/*
  Search form component
  TODO:
    Clean up hard coded data.
    Fix style.
*/


const allPlanets = gql`
  query {
    allPlanets {
      planets {
        name
        id
        climates
        diameter
        terrains
      }
    }
  }
`;

function SearchForm() {
  const formik = useFormik({
    initialValues: {
      search: "",
      climate: [],
      sort: "default",
    },
    onSubmit: (values) => {
      setShowDetails(false);
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        allPlanets
      ).then((data) => {
        searchStore.setPlanets(data.allPlanets.planets);
        searchStore.searchInput(formik.values.search.toLowerCase());
        searchStore.sortSearch(formik.values.sort);
        if (formik.values.climate.length > 0) {
          searchStore.filterSearch(formik.values.climate as []);
        }
      })
      .catch(error => console.log("There was a problem retrieving the data.", error));
    },
  });

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="lg:w-1/2 w-3/4">
      <form onSubmit={formik.handleSubmit}>
        <input
          onFocus={() => setShowDetails(true)}
          onChange={formik.handleChange}
          value={formik.values.search}
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search for a planet..."
          className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-amber-400
            bg-slate-700 bg-clip-padding
            border border-solid border-gray-500
            rounded
            transition
            ease-in-out
            m-0
            focus:text-amber-400 focus:bg-slate-700 
            focus:border-amber-400 focus:outline-none"
        />
        
        <div
          id="search-details"
          className={`
            w-full 
            min-w-96 
            md:max-h-48 
            bg-slate-700 
            py-2 
            px-1 
            rounded 
            flex md:flex-row flex-col justify-between content-center 
            border border-amber-400 
            ${showDetails ? "visible" : "hidden"}`}
        >
          <div className="flex flex-wrap flex-col text-amber-400 accent-amber-500 p-2">
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="arid"
                name="climate"
                value="arid"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="arid">Arid</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="temperate"
                name="climate"
                value="temperate"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="temperate">Temperate</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="tropical"
                name="climate"
                value="tropical"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="tropical">Tropical</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="frozen"
                name="climate"
                value="frozen"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="frozen">Frozen</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="murky"
                name="climate"
                value="murky"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="murky">Murky</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="windy"
                name="climate"
                value="windy"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="windy">Windy</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="artificialTemperate"
                name="climate"
                value="artificial temperate"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="artificialTemperate">Artificial</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="hot"
                name="climate"
                value="hot"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="hot">Hot</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="frigid"
                name="climate"
                value="frigid"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="frigid">Frigid</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="humid"
                name="climate"
                value="humid"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="humid">Humid</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="moist"
                name="climate"
                value="moist"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="moist">Moist</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="polluted"
                name="climate"
                value="polluted"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="polluted">Polluted</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="unknown"
                name="climate"
                value="unknown"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="unknown">Unknown</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="subartic"
                name="climate"
                value="subartic"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="subartic">Subartic</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="artic"
                name="climate"
                value="artic"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="artic">Artic</label>
            </div>
            <div className="flex content-center flex-row">
              <input
                type="checkbox"
                id="rocky"
                name="climate"
                value="rocky"
                onChange={formik.handleChange}
              />
              <label className="mx-2" htmlFor="rocky">Rocky</label>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <select
              onChange={formik.handleChange}
              name="sort"
              id="sort"
              className="bg-slate-700 border border-amber-400 rounded p-1"
            >
              <option value="default">Default: A to Z</option>
              <option value="reverse">Reverse: Z to A</option>
              <option value="size">Size: ascending</option>
              <option value="size-desc">Size: descending</option>
            </select>
            <button
              type="submit"
              className="border border-amber-400 rounded hover:bg-slate-800 focus:bg-amber-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
