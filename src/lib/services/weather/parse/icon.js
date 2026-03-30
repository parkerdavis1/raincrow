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

	// emoji icons
	const moonPhaseEmoji = weatherResults.start.lunarPhase;

	let emojiSet = new Set();

	for (let icon of uniqueIcons) {
		if (icon.endsWith('n')) {
			emojiSet.add(moonPhaseEmoji);
		}
		if (icon === '01d') {
			emojiSet.add('☀️');
		} else if (icon === '02d') {
			emojiSet.add('🌤');
		} else if (icon === '03d') {
			emojiSet.add('⛅️');
		} else if (icon === '04d' || icon === '04n') {
			emojiSet.add('☁️');
		} else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
			emojiSet.add('🌧');
		} else if (icon === '11d' || icon === '11n') {
			emojiSet.add('🌩');
		} else if (icon === '13d' || icon === '13n') {
			emojiSet.add('❄️');
		} else if (icon === '50d' || icon === '50n') {
			emojiSet.add('🌫');
		}
	}

	parsedIcons.emoji = Array.from(emojiSet).join('');

	return parsedIcons;
}
