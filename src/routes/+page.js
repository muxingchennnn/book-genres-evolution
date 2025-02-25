import { csvParse } from 'd3-dsv';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const [originalDataResponse, evolutionDataResponse, rankingDataResponse] = await Promise.all([
		import('$lib/data/Cleaned_Books_Dataset.csv?raw'),
		import('$lib/data/Genre_Popularity_Over_Year.csv?raw'),
		import('$lib/data/Genre_Aggregated_Popularity_Over_Decade.csv?raw')
	]);

	const originalData = csvParse(originalDataResponse.default);
	const evolutionData = csvParse(evolutionDataResponse.default);
	const rankingData = csvParse(rankingDataResponse.default);

	return {
		originalData,
		evolutionData,
		rankingData
	};
}

// export const ssr = false;
