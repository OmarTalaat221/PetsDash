import React, { useState } from "react";
import { json, Route, Routes } from "react-router-dom";
import { allRoutes, sellerRoutes, userRoutes } from "./RoutesData";

const RoutesData = () => {
  const [petsDashUser, setPetsDashUser] = useState(() => {
    const storedPetsDashUser = localStorage.getItem("petsDashUser");
    return storedPetsDashUser ? JSON.parse(storedPetsDashUser) : null;
  });

  console.log(petsDashUser);
  return (
    <>
      <Routes>
        {petsDashUser?.type == "admin" &&
          allRoutes?.map((item, index) =>
            item?.pathnames.map((path) => (
              <Route
                path={path}
                element={item.component}
                key={`${index}-${path}`}
              />
            ))
          )}
        {petsDashUser?.type == "user" &&
          userRoutes?.map((item, index) =>
            item?.pathnames.map((path) => (
              <Route
                path={path}
                element={item.component}
                key={`${index}-${path}`}
              />
            ))
          )}
        {petsDashUser?.type == "seller" &&
          sellerRoutes?.map((item, index) =>
            item?.pathnames.map((path) => (
              <Route
                path={path}
                element={item.component}
                key={`${index}-${path}`}
              />
            ))
          )}
      </Routes>
    </>
  );
};

export default RoutesData;
