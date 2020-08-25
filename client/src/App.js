import React from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

import CarList from './components/CarList'
import AddCar from './components/AddCar'

const client = new ApolloClient({
	uri: 'https://mybackend.run.goorm.io/graphql'
})

function App() {
  return (
	  <ApolloProvider client={client}>
    	<div className="App">
      		<CarList />
			<AddCar />
    	</div>
	  </ApolloProvider>
  );
}

export default App;
