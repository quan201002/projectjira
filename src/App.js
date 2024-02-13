import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage/Loginpage";
import Homepage from "./pages/Homepage/Homepage";
import Signuppage from "./pages/Signuppage/Signuppage";
import SecureGate from "./Layout/Securegate";
import Layout from "./Layout/Layout";
import CreateProject from "./pages/CreateProject/CreateProject";
import LoadingComponent from "./component/GlobalSetting/LoadingComponent";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";

function App() {
  return (
    <>
      <LoadingComponent />
      <>
        <Routes>
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/createproject" element={<CreateProject />}></Route>
            <Route
              path="/projectmanagement"
              element={<ProjectManagement />}
            ></Route>
          </Route>
          <Route path="/signup" element={<Signuppage />}></Route>
        </Routes>
      </>
    </>
  );
}

export default App;
