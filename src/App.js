import './App.scss';
import { Redirect, Router } from '@reach/router'
import EmployeesList from './components/list.component'
import EmployeesDetails from './components/details.component'


const App = () => {
  return (
    <div className="container">
      <div className="mt-3">
        <Router>
          <EmployeesList path="employees" />
          <EmployeesDetails path="employees/:id" />
          <Redirect from="/" to="/employees" default noThrow />
        </Router>
      </div>
    </div>
  )
};

export default App;
