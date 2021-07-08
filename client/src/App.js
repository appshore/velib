import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import FrescoList from './FrescoList';

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={'/frescoes'} className="navbar-brand">
                    Frescoes
                </Link>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={['/', '/frescoes']} component={FrescoList} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
