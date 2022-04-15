import React from "react";
import { useFormik } from "formik";

function SearchForm() {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={formik.values.search}
          type="text"
          name="search"
          className="
            dropdown-toggle
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
            focus:text-amber-400 focus:bg-slate-700 focus:border-amber-400 focus:outline-none"
        />

        <div className="w-full bg-slate-700 py-2 px-1 dropdown-menu rounded flex justify-between content-center border border-amber-400">
          <div className="flex flex-wrap flex-col text-amber-300">
            <label htmlFor="Climate1">Climate 1</label>
            <input
              type="checkbox"
              id="Climate1"
              name="Climate1"
              value="Climate1"
            />
            <label htmlFor="Climate2">Climate 2</label>
            <input
              type="checkbox"
              id="Climate2"
              name="Climate2"
              value="Climate1"
            />
            <label htmlFor="Climate3">Climate 3</label>
            <input
              type="checkbox"
              id="Climate3"
              name="Climate3"
              value="Climate3"
            />
            <label htmlFor="Climate4">Climate 4</label>
            <input
              type="checkbox"
              id="Climate4"
              name="Climate4"
              value="Climate4"
            />
          </div>
          <div className="flex flex-col justify-between">
            <select
              name="sort"
              id="sort"
              className="bg-slate-700 border border-amber-400 rounded p-1"
            >
              <option value="Low to high">Low to High</option>
              <option value="High to Low">High to Low</option>
              <option value="AZ">A to Z</option>
              <option value="ZA">Z to A</option>
            </select>
            <button type="submit" className="border border-amber-400 rounded hover:bg-slate-700">
                Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
