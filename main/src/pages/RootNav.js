import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import OrderPage from './OrderPage';

const RootNav = () => {
	return (
		<Router>
			<Route exact path = "/" component = { RootNav } />
			<Route path = "/orderpage" component = { OrderPage } />
		</Router>
	);
};

export default RootNav;
