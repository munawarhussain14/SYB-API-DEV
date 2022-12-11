import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { listReducer, listDetailsReducer } from "./reducers/listReducer";
import { authReducer, userReducer, usersReducer } from "./reducers/userReducer";
import {
  singleCategoryReducer,
  categoryReducer,
  subCategoryReducer,
} from "./reducers/categoryReducer";
import {
  activityReducer,
  singleActivityReducer,
} from "./reducers/activityReducer";
import {
  countriesReducer,
  statesReducer,
  citiesReducer,
} from "./reducers/locationReducer";
import {
  packagesReducer,
  packagesDetailReducer,
} from "./reducers/packageReducer";

import {
  advertisementReducer,
  advertisementDetailReducer,
} from "./reducers/advertisementReducer";

import { queriesReducer, queryDetailReducer } from "./reducers/queryReducer";
import { dataReducer } from "./reducers/dashboardReducer";
import {
  adPackagesReducer,
  adPackagesDetailReducer,
} from "./reducers/adPackageReducer";

import {
  adClassesReducer,
  adClassReducer,
  typesReducer,
  typeReducer,
} from "./reducers/adClassReducer";

import { mailReducer } from "./reducers/mailReducer";

const reducer = combineReducers({
  lists: listReducer,
  listDetails: listDetailsReducer,
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
  categories: categoryReducer,
  category: singleCategoryReducer,
  sub_categories: subCategoryReducer,
  activities: activityReducer,
  activity: singleActivityReducer,
  countries: countriesReducer,
  states: statesReducer,
  cities: citiesReducer,
  packages: packagesReducer,
  packageDetail: packagesDetailReducer,
  queries: queriesReducer,
  queryDetail: queryDetailReducer,
  advertisements: advertisementReducer,
  advertisement: advertisementDetailReducer,
  summary: dataReducer,
  adPackages: adPackagesReducer,
  adPackage: adPackagesDetailReducer,
  adClasses: adClassesReducer,
  adClass: adClassReducer,
  types: typesReducer,
  type: typeReducer,
  sendEmail: mailReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
