import 'whatwg-fetch';
import airports from '../../public/airports.json';
import flights from '../../public/flights.json';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
	fetchAirports() {
		// fetch('airports.json')
		// .then((response) => response.json())
		// .then((responseData) => {
		// 	// Call the AirportActionCreators success action with the parsed data
		// 	AirportActionCreators.fetchAirportsSuccess(responseData);
		// })
		// .catch((error) => {
		// 	// Call the AirportActionCreators error action with the error object
		// 	AirportActionCreators.fetchAirportsError(error);
		// });
		AirportActionCreators.fetchAirportsSuccess(airports);
	},

	fetchTickets(origin, destination) {
		AirportActionCreators.fetchTicketsSuccess(flights);
	}
}

export default AirCheapAPI;