import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ViewInternshipsPage from './ViewInternshipsPage';
import AddInternshipPage from './AddInternshipPage';
import ApprovalToolPage from './ApprovalToolPage';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'https://techintern.fyi/graphql' : 'http://localhost:4000/graphql',
});

const App: React.FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div>
          <h2>techintern.fyi</h2>
          <nav>
            <ul>
              <li>
                <Link to="/">View Internships</Link>
              </li>
              <li>
                <Link to="/addinternship">Add Internship</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/addinternship">
              <AddInternshipPage />
            </Route>
            <Route path="/approvaltool">
              <ApprovalToolPage />
            </Route>
            <Route path="/">
              <ViewInternshipsPage />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;
