import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ViewInternship from './pages/ViewInternship';
import AddInternship from './pages/AddInternship';
import AdminTool from './pages/AdminTool';
import { Menu, Typography, Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
const { Footer } = Layout;

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://internships-graphql-api.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
});

const App: React.FC = () => {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <Layout
          style={{
            backgroundColor: '#fff',
            minHeight: '100vh',
            overflow: 'hidden',
            display: 'block',
            position: 'relative',
            paddingBottom: '100px',
          }}
        >
          <br />
          <Typography>
            <Title style={{ textAlign: 'center' }}>
              TechIntern.fyi{' '}
              <span role="img" aria-label="graduate hat">
                🎓
              </span>
            </Title>
          </Typography>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[]}
            style={{ lineHeight: '48px', textAlign: 'center' }}
          >
            <Menu.Item key="1">
              <Link to="/">View Internships</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/addinternship">Add Internship</Link>
            </Menu.Item>
          </Menu>
          <Switch>
            <Route path="/addinternship">
              <AddInternship />
            </Route>
            <Route path="/admin">
              <AdminTool />
            </Route>
            <Route path="/">
              <ViewInternship />
            </Route>
          </Switch>
          <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <div style={{ textAlign: 'center' }}>© {new Date().getFullYear()} TechIntern.fyi</div>
          </Footer>
        </Layout>
      </ApolloProvider>
    </HashRouter>
  );
};

export default App;
