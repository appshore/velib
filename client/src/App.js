import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

import Map from './Map';

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={'/'} className="navbar-brand">
                    Velib
                </Link>
            </nav>

            <div className="container mt-3" >
                {/* pas vraiment nécessaire puisque l'on affiche qu'un composant */}
                <Switch>
                    <Route path={['/']} component={Map} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
