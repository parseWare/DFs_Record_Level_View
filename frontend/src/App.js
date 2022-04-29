import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Model from './model1';
import Model2 from './model2';
import Administrator from "./components/administrator";
import Consumer from "./components/consumer";
import Login from "./components/login";
import Publisher from "./components/publisher";
import SignUp from "./components/signup";


function App() {
  return (
    
    <div className="App">
      <Router>
      <Switch>
          <Route path="/dfs_app_dfs_model_covid" component={Model2} />
          <Route path="/dfs_app_dfs_model_custom" component={Model} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/publisher" component={Publisher} />
          <Route path="/administrator" component={Administrator} />
          <Route path="/consumer" component={Consumer} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
