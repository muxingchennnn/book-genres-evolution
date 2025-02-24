import { csvParse } from 'd3-dsv';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const [originalDataResponse, evolutionDataResponse] = await Promise.all([
		import('$lib/data/Cleaned_Books_Dataset.csv?raw'),
		import('$lib/data/Genre_Popularity_Over_Year.csv?raw')
	]);

	const originalData = csvParse(originalDataResponse.default);
	const evolutionData = csvParse(evolutionDataResponse.default);

	return {
		originalData,
		evolutionData
	};
}

// export const ssr = false;
