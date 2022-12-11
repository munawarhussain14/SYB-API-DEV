import "./App.css";
import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Lists from "./components/admin/lists/Lists";
import ListDetails from "./components/admin/lists/ListDetails";
import Proposal from "./components/admin/lists/Proposal";
import Login from "./components/user/Login";
import Register from "./components/user/Register.js";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateList from "./components/admin/lists/UpdateList";
import Packages from "./components/admin/packages/packages";
import AddPackage from "./components/admin/packages/add";
import Package from "./components/admin/packages/package";
import Users from "./components/admin/user/Users";
import User from "./components/admin/user/User";
import EditPackage from "./components/admin/packages/edit";
import Queries from "./components/admin/query/queries";
import Query from "./components/admin/query/query";
import Categories from "./components/admin/category/categories";
import EditCategory from "./components/admin/category/edit";
import Category from "./components/admin/category/category";
import AdClasses from "./components/admin/adClass/all";
import AdClass from "./components/admin/adClass/adClass";
import AdTypes from "./components/admin/adType/all";
import AdType from "./components/admin/adType/adType";
import AdPackages from "./components/admin/adpackages/all";
import AdPackage from "./components/admin/adpackages/adPackage";
import Advertisements from "./components/admin/advertisement/all";
import Advertisement from "./components/admin/advertisement/advertisement";
import ViewAdvertisement from "./components/admin/advertisement/show";
import AdminTemplate from "./components/layout/template";
import Activities from "./components/admin/activities/all";
import ImageCrop from "./components/admin/lists/ImageCrop";
import AddActivity from "./components/admin/activities/activity";
import Countries from "./components/admin/location/country";
import NewCountry from "./components/admin/location/country/new";
import EditCountry from "./components/admin/location/country/edit";
import States from "./components/admin/location/state";
import NewState from "./components/admin/location/state/new";
import EditState from "./components/admin/location/state/edit";
import Cities from "./components/admin/location/cities";
import NewCity from "./components/admin/location/cities/new";
import EditCity from "./components/admin/location/cities/edit";
import BuyerQueries from "./components/admin/buyerQuery/all";
import BuyerQuery from "./components/admin/buyerQuery/show";
import EditBuyerQuery from "./components/admin/buyerQuery/edit";
import BuyerQueriesContact from "./components/admin/buyerQueryContact/all";
import ShowBuyerQueryContact from "./components/admin/buyerQueryContact/show";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <div className="container container-fluid">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/me"
              element={<ProtectedRoute component={<Profile />} />}
            />
          </Routes>
        </div>
        <Routes>
          <Route
            path="/listing/:status"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="All Business" component={Lists} />
                }
              />
            }
          />
          <Route
            path="/lists"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="All Business" component={Lists} />
                }
              />
            }
          />
          <Route
            path="/list/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Edit Business" component={UpdateList} />
                }
              />
            }
          />
          <Route
            path="/list/show/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="View Business"
                    component={ListDetails}
                  />
                }
              />
            }
          />
          <Route
            path="/list/:id/:image_id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Crop Image" component={ImageCrop} />
                }
              />
            }
          />
          <Route
            path="/list/proposal/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Business Proposal"
                    component={Proposal}
                  />
                }
              />
            }
          />

          <Route
            path="/buyer-queries/:status"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="All Buyer Queries"
                    component={BuyerQueries}
                  />
                }
              />
            }
          />
          <Route
            path="/buyer-queries/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Edit Buyer Query"
                    component={EditBuyerQuery}
                  />
                }
              />
            }
          />

          <Route
            path="/buyer-queries/show/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="View Buyer Query"
                    component={BuyerQuery}
                  />
                }
              />
            }
          />

          <Route
            path="/buyer-queries-contacts/:status"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="All Buyer Queries Contacts"
                    component={BuyerQueriesContact}
                  />
                }
              />
            }
          />

          <Route
            path="/buyer-queries-contacts/:status/:query"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="All Buyer Queries Contacts"
                    component={BuyerQueriesContact}
                  />
                }
              />
            }
          />

          <Route
            path="/buyer-queries-contacts/show/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Buyer Querie Contact"
                    component={ShowBuyerQueryContact}
                  />
                }
              />
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Dashboard" component={Dashboard} />
                }
              />
            }
          />

          <Route
            path="/packages"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Packages" component={Packages} />
                }
              />
            }
          />

          <Route
            path="/packages/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Ad Packages" component={AddPackage} />
                }
              />
            }
          />

          <Route
            path="/packages/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Edit Package" component={EditPackage} />
                }
              />
            }
          />

          <Route
            path="/packages/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Package" component={Package} />
                }
              />
            }
          />

          <Route
            path="/activities"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Activities" component={Activities} />
                }
              />
            }
          />

          <Route
            path="/activities/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New Activity" component={AddActivity} />
                }
              />
            }
          />

          <Route
            path="/activities/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Edit Activity"
                    component={AddActivity}
                  />
                }
              />
            }
          />

          <Route
            path="/activities/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Package" component={Package} />
                }
              />
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute
                component={<AdminTemplate title="Users" component={Users} />}
              />
            }
          />

          <Route
            path="/user/:id"
            element={
              <ProtectedRoute
                component={<AdminTemplate title="User" component={User} />}
              />
            }
          />

          <Route
            path="/advertisements"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Advertisements"
                    component={Advertisements}
                  />
                }
              />
            }
          />

          <Route
            path="/advertisements/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="New Advertisements"
                    component={Advertisement}
                  />
                }
              />
            }
          />
          <Route
            path="/advertisements/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Edit Advertisement"
                    component={Advertisement}
                  />
                }
              />
            }
          />
          <Route
            path="/advertisements/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Advertisements"
                    component={ViewAdvertisement}
                  />
                }
              />
            }
          />

          <Route
            path="/queries"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Queries" component={Queries} />
                }
              />
            }
          />
          <Route
            path="/queries/:id"
            element={
              <ProtectedRoute
                component={<AdminTemplate title="Query" component={Query} />}
              />
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Categories" component={Categories} />
                }
              />
            }
          />

          <Route
            path="/categories/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New Category" component={Category} />
                }
              />
            }
          />

          <Route
            path="/categories/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Edit Category"
                    component={EditCategory}
                  />
                }
              />
            }
          />

          <Route
            path="/location/countries"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Countries" component={Countries} />
                }
              />
            }
          />

          <Route
            path="/location/countries/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New Country" component={NewCountry} />
                }
              />
            }
          />

          <Route
            path="/location/countries/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Edit Country" component={EditCountry} />
                }
              />
            }
          />

          <Route
            path="/location/states"
            element={
              <ProtectedRoute
                component={<AdminTemplate title="States" component={States} />}
              />
            }
          />

          <Route
            path="/location/states/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New State" component={NewState} />
                }
              />
            }
          />

          <Route
            path="/location/states/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Edit State" component={EditState} />
                }
              />
            }
          />

          <Route
            path="/location/cities"
            element={
              <ProtectedRoute
                component={<AdminTemplate title="Cities" component={Cities} />}
              />
            }
          />

          <Route
            path="/location/cities/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New City" component={NewCity} />
                }
              />
            }
          />

          <Route
            path="/location/cities/edit/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Edit City" component={EditCity} />
                }
              />
            }
          />

          <Route
            path="/adPackages"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Advertisement Packages"
                    component={AdPackages}
                  />
                }
              />
            }
          />
          <Route
            path="/adPackages/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New Ad Package" component={AdPackage} />
                }
              />
            }
          />
          <Route
            path="/adPackages/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Update Ad Package"
                    component={AdPackage}
                  />
                }
              />
            }
          />
          <Route
            path="/adClasses"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Ad Classes" component={AdClasses} />
                }
              />
            }
          />
          <Route
            path="/adClasses/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New Ad Class" component={AdClass} />
                }
              />
            }
          />
          <Route
            path="/adClasses/:id"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="Ad Class" component={AdClass} />
                }
              />
            }
          />
          <Route
            path="/advertisementTypes"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate
                    title="Advertisement Type"
                    component={AdTypes}
                  />
                }
              />
            }
          />
          <Route
            path="/advertisementTypes/new"
            element={
              <ProtectedRoute
                component={
                  <AdminTemplate title="New Ad Type" component={AdType} />
                }
              />
            }
          />
          <Route
            path="/advertisementTypes/:id"
            element={
              <ProtectedRoute
                component={<AdminTemplate title="Ad Type" component={AdType} />}
              />
            }
          />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
