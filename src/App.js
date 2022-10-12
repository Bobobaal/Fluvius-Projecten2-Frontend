import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

// React router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Contexts
import { CategorieProvider } from "./context/CategorieContext";
import { GoalsProvider } from './context/GoalsContext';
import { DoelstellingProvider } from './context/DoelstellingContext';
import { DatasourceProvider } from './context/DatasourceContext'
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';


// Components
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

//Pages
import Login from './pages/Login';
import CategorieLijstPage from "./pages/CategorieLijstPage";
import CategoriePage from './pages/CategoriePage';
import DoelstellingLijstPage from "./pages/DoelstellingLijstPage";
import DoelstellingPage from './pages/DoelstellingPage';
import DatasourceLijstPage from './pages/DatasourceLijstPage';
import DatasourcePage from './pages/DatasourcePage'
import DashboardPage from "./pages/DashboardPage";
import DashboardStap1 from "./pages/DashboardStap1";
import DashboardStap2 from "./pages/DashboardStap2";
import DashboardLijstPage from "./pages/DashboardLijstPage";



function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <GoalsProvider>
          <CategorieProvider>
            <DoelstellingProvider>
              <DatasourceProvider>
                <DashboardProvider>
                  <Router>
                    <NavBar />
                    <Switch>
                      <PrivateRoute exact path="/">test</PrivateRoute>
                      <PrivateRoute exact path="/categorie"><CategorieLijstPage /></PrivateRoute>
                      <PrivateRoute exact path="/categorie/:id" ><CategoriePage /></PrivateRoute>
                      <PrivateRoute exact path="/doelstelling" ><DoelstellingLijstPage /></PrivateRoute>
                      <PrivateRoute exact path="/doelstelling/:id" ><DoelstellingPage isSubdoelstelling={false} /></PrivateRoute>
                      <PrivateRoute exact path="/doelstelling/:id/:subDoelstellingId" ><DoelstellingPage isSubdoelstelling={true} /></PrivateRoute>
                      <PrivateRoute exact path="/datasource" ><DatasourceLijstPage/></PrivateRoute>
                      <PrivateRoute exact path="/datasource/:id" ><DatasourcePage/></PrivateRoute>
                      <PrivateRoute exact path="/dashboard" ><DashboardPage /></PrivateRoute>
                      <PrivateRoute exact path="/dashboard/lijst" ><DashboardLijstPage /></PrivateRoute>
                      <PrivateRoute exact path="/dashboard/stap1" ><DashboardStap1 /></PrivateRoute>
                      <PrivateRoute exact path="/dashboard/stap2" ><DashboardStap2 /></PrivateRoute>
                      <PrivateRoute exact path="/dashboard/stap1/:id" ><DashboardStap1 /></PrivateRoute>
                      <PrivateRoute exact path="/dashboard/stap2/:id" ><DashboardStap2 /></PrivateRoute>
                      <PrivateRoute exact path="/dashboard/stap2/personaliseer" ><DashboardStap2/></PrivateRoute>
                      <PrivateRoute exact path="/dashboard" ><DashboardPage /></PrivateRoute>
                      <Route path="/login" ><Login /></Route>
                    </Switch>
                  </Router>
                </DashboardProvider>
              </DatasourceProvider>
            </DoelstellingProvider>
          </CategorieProvider>
        </GoalsProvider>
      </AuthProvider>  
    </ChakraProvider>
  );
}

export default App;
