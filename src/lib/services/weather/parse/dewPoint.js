import { dataRange } from '$lib/services/helpers';
import { convertToCelsius } from '$lib/services/conversions';

export function parseDewPoint(weatherResults) {
	let startDewPoint = weatherResults.start.data[0].dew_point;
	let endDewPoint = weatherResults.end?.data[0].dew_point;

	let parsedDewPoint = {
		f: dataRange(Math.round(startDewPoint), Math.round(endDewPoint)) + '°F',
		c:
			dataRange(
				Math.round(convertToCelsius(startDewPoint)),
				Math.round(convertToCelsius(endDewPoint))
			) + '°C'
	};

	return parsedDewPoint;
}
