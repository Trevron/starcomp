import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { request, gql } from "graphql-request";
import { useRootStore } from "../store/RootStoreProvider";
import { allPlanets } from "../model/Query";

/*
  Search form component
  TODO:
    Clean up hard coded data.
    Fix style.
*/

function SearchForm() {

  const store = useRootStore();
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
        store.search.setPlanets(data.allPlanets.planets);
        store.search.searchInput(formik.values.search.toLowerCase());
        store.search.sortSearch(formik.values.sort);
        if (formik.values.climate.length > 0) {
          store.search.filterSearch(formik.values.climate as []);
        }
      })
      .catch(error => console.log("There was a problem retrieving the data.", error));
    },
  });

  const [showDetails, setShowDetails] = useState(false);

  const climateList: string[] = ["arid", "temperate", "tropical", "frozen", "murky", "windy", 
                        "rocky", "hot", "frigid", "humid", "moist",
                        "polluted", "unknown", "subartic", "artic", "artificial temperate"
                      ];
                    
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

            {
              climateList.map(climateType => {
                return (
                  <div key={climateType} className="flex content-center flex-row">
                    <input
                      type="checkbox"
                      id={climateType}
                      name="climate"
                      value={climateType}
                      onChange={formik.handleChange}
                    />
                    <label className="mx-2" htmlFor={climateType}>{climateType.charAt(0).toUpperCase().concat(climateType.slice(1))}</label>
                  </div>
                )
              })
            }

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
