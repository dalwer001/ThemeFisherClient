import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ManageStudent from './Components/Students/ManageStudent/ManageStudent';
import NotFound from './Components/Students/NotFound/NotFound';
import Navbar from './Components/Shared/Navbar/Navbar';
import AddStudent from './Components/Students/AddStudent/AddStudent';
import UpdateStudentInfo from './Components/Students/UpdateStudentInfo/UpdateStudentInfo';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <ManageStudent/>
        </Route>

        <Route path="/manageStudent">
          <ManageStudent/>
        </Route>

        <Route path="/addStudent">
          <AddStudent/>
        </Route>

        <Route path="/updateStudent/:id">
          <UpdateStudentInfo/>
        </Route>

        <Route exact path="*">
          <NotFound/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
