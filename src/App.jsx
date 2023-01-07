import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import Header from "./Header.jsx";
import ActivityFeed from "./pages/Activity_Feed.jsx";
import ActivityDetail from "./pages/Activity_Detail.jsx";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<ActivityFeed />}></Route>
          <Route path="/detail/:id" element={<ActivityDetail />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
