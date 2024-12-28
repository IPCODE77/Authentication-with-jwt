import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Singup } from "./component/userLoginSignUp/signup";
import { LoginForm } from "./component/userLoginSignUp/login";
import { HomePage } from "./component/HomePage/home";
import { Appcontext, Appprovider } from "../src/GlobalStates/userGlobalStates";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Singup />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/home',
    element: <HomePage />
  }
])

function App() {
  return (
    <Appprovider>
      <RouterProvider router={router}/>
    </Appprovider>
  );
}

export default App;
