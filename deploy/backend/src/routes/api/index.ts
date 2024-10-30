import express from "express";
import { Router } from "express-serve-static-core";

import { signUpRoute } from "./signup.route";

export const apiRouter = express.Router();

const defaultRoutes = [
  {
    path: "/signup",
    route: signUpRoute,
  },
];

const addRoutes = (router: Router, routes: any[]) => {
  routes.forEach((route) => {
    if (Array.isArray(route.route)) {
      // If the route has nested routes, recursively add them
      const nestedRouter = express.Router();
      addRoutes(nestedRouter, route.route);
      router.use(route.path, nestedRouter);
    } else {
      router.use(route.path, route.route);
    }
  });
};

addRoutes(apiRouter, defaultRoutes);
