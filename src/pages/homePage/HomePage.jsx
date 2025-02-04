// src/pages/homePage/HomePage.jsx

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello </h1>
          <p className="py-6">
            Welcome to your Phone Book app! Easily manage your contacts, find
            important numbers, and stay connected. Enjoy a seamless experience
            with quick search, organized lists, and effortless contact
            management.
          </p>
          <button className="btn btn-primary">
            <Link to="/register" className="text-white no-underline">
              Get Started
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
