import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Singup } from "./component/userLoginSignUp/signup";
import { LoginForm } from "./component/userLoginSignUp/login";
import { HomePage } from "./component/HomePage/home";
import { Appcontext, Appprovider } from "../src/component/globalVariables/AuthContext";
import { ProtectedRoutes } from "../src/component/AuthCheck/protectedRoute";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Singup />, // Signup page does not need protection
  },
  {
    path: '/login',
    element: <LoginForm />, // Login page does not need protection
  },
  {
    path: '/home',
    element: (
      <ProtectedRoutes>
        <HomePage /> {/* Home page is protected */}
      </ProtectedRoutes>
    ),
  },
]);


function App() {
  return (
    <Appprovider>
      <RouterProvider router={router} />
    </Appprovider>
  );
}

export default App;
