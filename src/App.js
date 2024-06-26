import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage/Loginpage";
import Homepage from "./pages/Homepage/Homepage";
import Signuppage from "./pages/Signuppage/Signuppage";

import Layout from "./Layout/Layout";
import CreateProject from "./pages/CreateProject/CreateProject";
import LoadingComponent from "./component/GlobalSetting/LoadingComponent";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import Modaljira from "./HOC/JiraCloneHOC/Modaljira";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import ModalDetail from "./HOC/JiraCloneHOC/ModalDetail";
import DemoDrag from "./pages/DemoDrag";
import DragandDropDnd from "./pages/DragandDropDnd";
import SecureGate from "./component/GlobalSetting/SecureGate";
import ProfilePage from "./pages/ProfilePage.js/ProfilePage";

function App() {
  return (
    <>
      <LoadingComponent />
      <Routes>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/" element={<Layout />}>
          <Route path="/createproject" element={<CreateProject />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/projectmanagement"
            element={<ProjectManagement />}
          ></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route
            path="/projectdetail/:projectId"
            element={<ProjectDetail />}
          ></Route>
        </Route>
        <Route path="/signup" element={<Signuppage />}></Route>
        <Route path="/modalHOC" element={<Modaljira />}></Route>
      </Routes>
    </>
  );
}

export default App;
