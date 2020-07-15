import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";

import "semantic-ui-css/semantic.min.css";

import AuthRoute from "./util/AuthRoute";
import SecondRoute from "./util/SecondRoute";
import {
	sync,
	totalCallers,
	winnersList,
	questionsList,
	todo,
} from "./redux/actions/dataActions";
import { useDispatch } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://sun-bangla.distronix.in:4000";

function App() {
	//const data = useSelector(state => state.data);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(sync());
		// dispatch(todo());
		dispatch(winnersList());
		dispatch(questionsList());
		dispatch(totalCallers());
	}, []);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<AuthRoute exact path='/' component={Home} />
					<SecondRoute exact path='/login' component={Login} />
					<SecondRoute exact path='/signup' component={Signup} />
				</Switch>
			</Router>
		</div>
	);
}

export default React.memo(App);
