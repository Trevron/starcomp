import React, { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import SearchForm from "../components/SearchForm";
import searchStore from "../store/SearchStore";
import SearchResults from "../components/SearchResults";

/**
 * This page allows access to the search form as well as hosting the search results.
 */

function Search() {
  return (
    <div className="flex flex-col ">
      <div className="text-gray-50 flex content-center align-center justify-center content-center">
        <SearchForm />
      </div>
      <div>
        <SearchResults />
      </div>
    </div>
  );
}

export default Search;
