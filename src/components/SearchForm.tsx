import React, { useEffect } from "react";
import { useFormik } from "formik";
import searchStore from "../store/SearchStore";
import { request, gql } from "graphql-request";

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
      hideDetails();
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
      });
    },
  });

  function showDetails() {
    const details = document.getElementById("search-details");
    if (details && details.classList.contains("hidden")) {
      details.classList.remove("hidden");
    }
  }

  function hideDetails() {
    const details = document.getElementById("search-details");
    if (details && !details.classList.contains("hidden")) {
      details.classList.add("hidden");
    }
  }

  return (
    <div className="w-3/4">
      <form onSubmit={formik.handleSubmit}>
        <input
          onFocus={showDetails}
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
          className="
            w-full 
            min-w-96 
            md:max-h-48 
            bg-slate-700 
            py-2 
            px-1 
            rounded 
            flex md:flex-row flex-col justify-between content-center 
            border border-amber-400 
            hidden"
        >
          <div className="flex flex-wrap flex-col text-amber-400 accent-amber-500 p-2">
            <div className="flex content-center flex-col self-center">
              <label htmlFor="arid">Arid</label>
              <input
                type="checkbox"
                id="arid"
                name="climate"
                value="arid"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="temperate">Temperate</label>
              <input
                type="checkbox"
                id="temperate"
                name="climate"
                value="temperate"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="tropical">Tropical</label>
              <input
                type="checkbox"
                id="tropical"
                name="climate"
                value="tropical"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="frozen">Frozen</label>
              <input
                type="checkbox"
                id="frozen"
                name="climate"
                value="frozen"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="murky">Murky</label>
              <input
                type="checkbox"
                id="murky"
                name="climate"
                value="murky"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="windy">Windy</label>
              <input
                type="checkbox"
                id="windy"
                name="climate"
                value="windy"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="artificialTemperate">Artificial</label>
              <input
                type="checkbox"
                id="artificialTemperate"
                name="climate"
                value="artificial temperate"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="hot">Hot</label>
              <input
                type="checkbox"
                id="hot"
                name="climate"
                value="hot"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="frigid">Frigid</label>
              <input
                type="checkbox"
                id="frigid"
                name="climate"
                value="frigid"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="humid">Humid</label>
              <input
                type="checkbox"
                id="humid"
                name="climate"
                value="humid"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="moist">Moist</label>
              <input
                type="checkbox"
                id="moist"
                name="climate"
                value="moist"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="polluted">Polluted</label>
              <input
                type="checkbox"
                id="polluted"
                name="climate"
                value="polluted"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="unknown">Unknown</label>
              <input
                type="checkbox"
                id="unknown"
                name="climate"
                value="unknown"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="subartic">Subartic</label>
              <input
                type="checkbox"
                id="subartic"
                name="climate"
                value="subartic"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="artic">Artic</label>
              <input
                type="checkbox"
                id="artic"
                name="climate"
                value="artic"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex content-center flex-col self-center">
              <label htmlFor="rocky">Rocky</label>
              <input
                type="checkbox"
                id="rocky"
                name="climate"
                value="rocky"
                onChange={formik.handleChange}
              />
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
