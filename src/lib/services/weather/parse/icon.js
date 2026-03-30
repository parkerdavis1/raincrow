export function parseIcon(weatherResults) {
	let parsedIcons = {
		open: '',
		emoji: ''
	};
	let uniqueIcons = [];

	//  check for multiple icons, if they are unique, add them
	for (let obj of weatherResults.start.data[0].weather) {
		if (!uniqueIcons.includes(obj.icon)) {
			uniqueIcons.push(obj.icon);
		}
	}

	// if end weather, check for multiple icons; if they are unique, add them
	if (weatherResults.end) {
		for (let obj of weatherResults.end.data[0].weather) {
			if (!uniqueIcons.includes(obj.icon)) {
				uniqueIcons.push(obj.icon);
			}
		}
	}

	// create string of openweather icon img elements
	for (let icon of uniqueIcons) {
		parsedIcons.open += `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Open Weather Icon">`;
	}

	const moonPhaseEmoji = (weatherResults.start && weatherResults.start.lunarPhase) || '';

	// emoji icons
	for (let icon of uniqueIcons) {
		if (icon === '01d' || (icon === '01n' && moonPhaseEmoji == null)) {
			parsedIcons.emoji += '☀️';
		} else if (icon === '01n') {
			parsedIcons.emoji += moonPhaseEmoji;
		} else if (icon === '02d' || (icon === '02n' && moonPhaseEmoji == null)) {
			parsedIcons.emoji += '🌤';
		} else if (icon === '02n') {
			parsedIcons.emoji += moonPhaseEmoji;
		} else if (icon === '03d' || (icon === '03n' && moonPhaseEmoji == null)) {
			parsedIcons.emoji += '⛅️';
		} else if (icon === '03n') {
			parsedIcons.emoji += moonPhaseEmoji;
		} else if (icon === '04d' || icon === '04n') {
			parsedIcons.emoji += '☁️';
		} else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
			parsedIcons.emoji += '🌧';
		} else if (icon === '11d' || icon === '11n') {
			parsedIcons.emoji += '🌩';
		} else if (icon === '13d' || icon === '13n') {
			parsedIcons.emoji += '❄️';
		} else if (icon === '50d' || icon === '50n') {
			parsedIcons.emoji += '🌫';
		}
	}

	return parsedIcons;
}
