import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import rootReducer from './reducers/Reducer_index';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(rootReducer, composePlugin(applyMiddleware(promise)));

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

//App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          {/* //Use Browser Router to route to different pages */}
          <BrowserRouter>
            <div className="container-fluid">
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
