import React from "react";
import { PlanetInterface } from "../store/PlanetStore";

function Planet() {
  return (
    <div className="text-gray-50">
      <h1>Planet Name</h1>
      <div>
        <h2>Description</h2>
        <p>Description text.</p>
      </div>
      <div>
        <h2>Details</h2>
        <ul>
          <li>Detail</li>
          <li>Detail</li>
          <li>Detail</li>
          <li>Detail</li>
        </ul>
      </div>
      <div>
        <h2>Residents</h2>
        <ul>
          <li>Resident</li>
          <li>Resident</li>
          <li>Resident</li>
        </ul>
      </div>
    </div>
  );
}

export default Planet;
