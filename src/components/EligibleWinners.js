import React from "react";
import {
	Grid,
	Container,
	CircularProgress,
	Slide,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import Mon from "moment";
import {
	cleanEligibleWinnersList,
	getdEligibleWinners,
} from "../redux/actions/dataActions";

import {
	Icon,
	Label,
	Menu,
	Table,
	Message,
	Transition,
	Dropdown,
} from "semantic-ui-react";
import { CSVLink } from "react-csv";

const useStyles = makeStyles(theme => ({
	header: {
		fontSize: 19,
		color: "#6b6b6b",
		marginTop: 100,
		fontFamily: "open",
	},
	btn: {
		background: "#eb9881",
		borderRadius: 3,
		textTransform: "capitalize",
		cursor: "pointer",
		borderRadius: 50,
		paddingLeft: 15,
		paddingRight: 15,
		height: 30,
		position: "relative",
		transition: "all .1s linear	",
		margin: 5,
		color: "#fff",
		boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.12)",
		userSelect: "none",
		"&:hover": {
			background: "#e65730",
			transition:
				"opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease",
			boxShadow: "12px 15px 20px rgba(0,0,0,.1)",
		},

		"&:active": {
			transition: "all .1s linear	",

			transform: "translateY(3px)",
		},
	},
	txt: {
		transform: "translate(-50%,-50%)",
		left: "50%",
		top: "50%",
		position: "absolute",
		fontWeight: 500,
		width: "100%",
	},
	wrap: {
		width: "100%",
		position: "relative",
		height: 130,
		background: "#fff",
		boxShadow: "0 0 0 1px rgba(255,255,255,.1), 0 2px 4px 0 rgba(14,30,37,.12)",
		borderRadius: 5,
		border: "1px solid rgba(34,36,38,.15)",
	},
	night: {
		background: "#2b2b2b",
	},
	footer: {
		color: "#999",
		position: "absolute",
		bottom: 20,

		[theme.breakpoints.up("xs")]: {
			marginLeft: 5,
			marginRight: 5,
			fontSize: 10,
			position: "fixed",
			bottom: 20,
		},

		[theme.breakpoints.up("md")]: {
			fontSize: 12,
			paddingBottom: 0,
		},
		[theme.breakpoints.up("lg")]: { fontSize: 12, paddingBottom: 0 },
	},
}));

function TransitionUp(props) {
	return <Slide {...props} direction='up' />;
}

export default function Winners() {
	const [selectedDate, setSelectedDate] = React.useState(
		Mon().format("YYYY-MM-DD")
	);
	const [state, setState] = React.useState({
		open2: false,
		vertical: "bottom",
		horizontal: "right",
	});
	const dispatch = useDispatch();

	const handleDateChange = date => {
		console.log(date.target.value);
		setSelectedDate(date.target.value);
		dispatch(cleanEligibleWinnersList());
	};
	const theme = useSelector(state => state.data.theme);
	const data = useSelector(state => state.data);

	const classes = useStyles();

	const eligibleWinners = () => {
		if (selectedDate !== "") {
			const data = {
				date: selectedDate,
			};
			dispatch(getdEligibleWinners(data, "eligibleprogress2"));
		} else {
			console.log("input field required");

			setState({ ...state, open2: true });
			setTimeout(() => {
				setState({ ...state, open2: false });
			}, 3000);
		}
	};

	const downloadEligibleWinners = () => {
		if (selectedDate !== "") {
			const data = {
				date: selectedDate,
			};
			dispatch(getdEligibleWinners(data, "eligibleprogress"));
		} else {
			console.log("input field required");

			setState({ ...state, open2: true });
			setTimeout(() => {
				setState({ ...state, open2: false });
			}, 3000);
		}
	};

	const { vertical, horizontal, open2 } = state;
	console.log(
		"from eligible",
		data.getEligibleWinners,
		Object.keys(data.getEligibleWinners).length
	);

	return (
		<div>
			<p className={classes.header}>Eligible Winners List</p>
			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={3} lg={3}>
					<Table celled striped inverted={theme}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='3'>
									{" "}
									Eligible winners
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row id='bR'>
								<Table.Cell>
									<div
										className='ui input'
										style={{ width: "60%", marginLeft: "20%" }}
									>
										<input
											type='date'
											placeholder='Pick Date'
											style={{
												background: theme ? "#212020" : "#fff",
												color: theme ? "#ccc" : "#212121",
												userSelect: "none",
											}}
											value={selectedDate}
											onChange={handleDateChange}
										/>
									</div>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Container maxWidth='sm'>
						<Grid
							container
							justify='center'
							alignItems='center'
							style={{ marginTop: 15, justifyContent: "space-around" }}
						>
							<Grid
								xs={5}
								md={5}
								lg={5}
								className={classes.btn}
								onClick={eligibleWinners}
							>
								{data.eligibleprogress2 ? (
									<CircularProgress
										size={12}
										style={{ color: "#fff", margintop: 10 }}
									/>
								) : (
									<b className={classes.txt}>Download</b>
								)}
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
			<Grid
				container
				justify='center'
				alignItems='center'
				spacing={2}
				style={{ marginTop: 55 }}
			>
				{Object.keys(data.getEligibleWinners).length > 0 && (
					<>
						{data.getEligibleWinners.Nandini.length > 0 ? (
							<Grid
								xs={3}
								md={1}
								lg={1}
								className={classes.btn}
								style={{ background: "#21ba45" }}
							>
								<CSVLink
									onClick={true}
									data={data.getEligibleWinners.Nandini}
									filename={
										"Nandini EligibleWinnersList - " + selectedDate + ".csv"
									}
								>
									<b className={classes.txt} style={{ color: "#fff" }}>
										Nandini
									</b>
								</CSVLink>
							</Grid>
						) : (
							""
						)}

						{data.getEligibleWinners.Singhalagna.length > 0 ? (
							<Grid
								xs={3}
								md={1}
								lg={1}
								className={classes.btn}
								style={{ background: "#21ba45" }}
							>
								<CSVLink
									onClick={true}
									data={data.getEligibleWinners.Singhalagna}
									filename={
										"Singhalagna EligibleWinnersList - " + selectedDate + ".csv"
									}
								>
									<b className={classes.txt} style={{ color: "#fff" }}>
										Singhalagna
									</b>
								</CSVLink>
							</Grid>
						) : (
							""
						)}

						{data.getEligibleWinners.Jiyonkathi.length > 0 ? (
							<Grid
								xs={3}
								md={1}
								lg={1}
								className={classes.btn}
								style={{ background: "#21ba45" }}
							>
								<CSVLink
									onClick={true}
									data={data.getEligibleWinners.Jiyonkathi}
									filename={
										"Jiyonkathi EligibleWinnersList - " + selectedDate + ".csv"
									}
								>
									<b className={classes.txt} style={{ color: "#fff" }}>
										Jiyonkathi{" "}
									</b>
								</CSVLink>
							</Grid>
						) : (
							""
						)}

						{data.getEligibleWinners.Sarbamangala.length > 0 ? (
							<Grid
								xs={3}
								md={1}
								lg={1}
								className={classes.btn}
								style={{ background: "#21ba45" }}
							>
								<CSVLink
									onClick={true}
									data={data.getEligibleWinners.Sarbamangala}
									filename={
										"Sarbamangala EligibleWinnersList - " +
										selectedDate +
										".csv"
									}
								>
									<b className={classes.txt} style={{ color: "#fff" }}>
										Sarbamangala
									</b>
								</CSVLink>
							</Grid>
						) : (
							""
						)}

						{data.getEligibleWinners.Beder_Meye_Jyotsna.length > 0 ? (
							<Grid
								className={classes.btn}
								style={{
									background: "#21ba45",
									width: 170,
								}}
							>
								<CSVLink
									onClick={true}
									data={data.getEligibleWinners.Beder_Meye_Jyotsna}
									filename={
										"Beder meye jyotsna EligibleWinnersList - " +
										selectedDate +
										".csv"
									}
								>
									<b className={classes.txt} style={{ color: "#fff" }}>
										Beder Meye Jyotsna
									</b>
								</CSVLink>
							</Grid>
						) : (
							""
						)}

						{data.getEligibleWinners.Kone_Bou.length > 0 ? (
							<Grid
								xs={3}
								md={1}
								lg={1}
								className={classes.btn}
								style={{ background: "#21ba45" }}
							>
								<CSVLink
									onClick={true}
									data={data.getEligibleWinners.Kone_Bou}
									filename={
										"kone Bou EligibleWinnersList - " + selectedDate + ".csv"
									}
								>
									<b className={classes.txt} style={{ color: "#fff" }}>
										kone Bou
									</b>
								</CSVLink>
							</Grid>
						) : (
							""
						)}
					</>
				)}
			</Grid>

			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={5} lg={4}>
					<Transition
						visible={data.noEligibleWinners}
						animation='scale'
						duration={500}
					>
						<Message style={{ marginTop: 40 }}>
							<Message.Header>No Data Found!</Message.Header>
							<Message.Item>
								After Querying , No Data found For Date {selectedDate}
							</Message.Item>
						</Message>
					</Transition>
				</Grid>
			</Grid>

			<Grid container justify='center' alignItems='center'>
				<Grid item xs={10} md={5} lg={4}>
					{Object.keys(data.getEligibleWinners).length > 0 &&
						data.getEligibleWinners.Singhalagna.length === 0 &&
						data.getEligibleWinners.Nandini.length === 0 &&
						data.getEligibleWinners.Kone_Bou.length === 0 &&
						data.getEligibleWinners.Beder_Meye_Jyotsna.length === 0 &&
						data.getEligibleWinners.Jiyonkathi.length === 0 &&
						data.getEligibleWinners.Sarbamangala.length === 0 && (
							<Transition visible={true} animation='scale' duration={500}>
								<Message style={{ marginTop: 40 }}>
									<Message.Header>No Data Found</Message.Header>
									<Message.Item>
										{`After Querying No Data Found For Date ${selectedDate}`}
									</Message.Item>
								</Message>
							</Transition>
						)}
				</Grid>
				<div className={classes.footer}>
					All Rights Reserved By <b style={{ fontWeight: 400 }}>SUN বাংলা</b>.
					Designed And Developed By{" "}
					<b style={{ color: "#039af4" }}>DISTRONIX</b>
					<img
						src={require("../images/logo.png")}
						style={{ width: 20, marginBottom: -5, marginLeft: 2 }}
					/>
				</div>
			</Grid>

			<Snackbar
				id='snack'
				anchorOrigin={{ vertical, horizontal }}
				open={open2}
				message='Required all input field'
				key={vertical + horizontal}
				TransitionComponent={TransitionUp}
			/>
		</div>
	);
}
