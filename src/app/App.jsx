import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProviderApp from './components/Provider';
import Router from './router';
import store from './store';

const App = () =>  (
	<Provider store={store}>
		<BrowserRouter>
			<ProviderApp>
				<Router />
			</ProviderApp>
		</BrowserRouter>
	</Provider>
);

export default App;
