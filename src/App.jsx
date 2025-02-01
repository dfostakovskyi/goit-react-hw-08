// src/App.js

import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { refreshUserThunk } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import "./App.css";

const HomePage = lazy(() => import("./paiges/homePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./paiges/registrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./paiges/loginPage/LoginPage"));
const ContactsPage = lazy(() => import("./paiges/contactsPage/ContactsPage"));

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
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

// RegistrationPage.jsx:40 User Data: {name: 'qwerty', email: 'qwerty5555555@mail.com', password: 'Qwerty123'}
// RegistrationPage.jsx:55 API Response: {user: {…}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N…zMTV9.ct7jPXx0516qc9Adjty9pThm0oA6npmAPIloFx-uLkw'}
