import { Moon, Hemisphere } from 'lunarphase-js';

/**
 * Get the lunar phase emoji for a given date and latitude.
 * @param {Date} date - The date to get the lunar phase for.
 * @param {string} lat - The latitude of the location.
 * @returns {string|null} The lunar phase emoji, or null if invalid input.
 */

export function getLunarPhase(date, lat) {
	try {
		// Validate date
		if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
			console.error('getLunarPhase: invalid date', date);
			return null;
		}

		// Validate latitude (default to 0 if bad input)
		const latNum = parseFloat(lat.trim());
		if (typeof latNum !== 'number' || Number.isNaN(Number(latNum))) {
			console.warn('getLunarPhase: invalid lat, defaulting to 0', lat);
			latNum = 0;
		}

		const hemi = latNum < 0 ? Hemisphere.SOUTHERN : Hemisphere.NORTHERN;
		const emoji = Moon.lunarPhaseEmoji(date, { hemisphere: hemi });

		return typeof emoji === 'string' ? emoji : null;
	} catch (err) {
		// Fail softly — caller code can still work even without a lunar emoji
		console.error('getLunarPhase error:', err);
		return null;
	}
}
