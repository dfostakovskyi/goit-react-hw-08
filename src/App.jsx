// src/App.js

import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { refreshUserThunk } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import "./App.css";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/registrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/loginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/contactsPage/ContactsPage"));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Публічні маршрути */}
          <Route
            path="/register"
            element={
              <RestrictedRoute
                element={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute element={<LoginPage />} redirectTo="/contacts" />
            }
          />

          {/* Приватний маршрут */}
          <Route
            path="/contacts"
            element={
              <PrivateRoute element={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

// RegistrationPage.jsx:40 User Data: {name: 'qwerty', email: 'qwerty5555555@mail.com', password: 'Qwerty123'}
