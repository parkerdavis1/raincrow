import { TIMEZONE_API_URL } from '$env/static/private';

export async function getTimezone(lat, lon, fetch) {
	const url = new URL(TIMEZONE_API_URL);
	url.searchParams.set('lat', String(lat));
	url.searchParams.set('lon', String(lon));
	console.log(url.toString());

	const response = await fetch(url.toString());

	if (!response.ok) {
		let message = 'Failed to resolve timezone';

		try {
			const data = await response.json();
			if (data?.error) message = data.error;
		} catch {
			// ignore JSON parse errors
		}

		throw new Error(message);
	}

	const data = await response.json();

	if (!data?.timezone || typeof data.timezone !== 'string') {
		throw new Error('Timezone API returned invalid data');
	}

	return data.timezone;
}
