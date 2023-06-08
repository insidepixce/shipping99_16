import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Posts } from "./pages/Posts";
import { PostDetail } from "./pages/PostDetail";
import { Upload } from "./pages/Upload";
import { Login } from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>404 not found</p>,
    children: [
      { index: true, element: <Posts /> },
      { path: "/detail/:postId", element: <PostDetail /> },
      { path: "/upload", element: <Upload /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
