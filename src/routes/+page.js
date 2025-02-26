import { csvParse, autoType } from 'd3-dsv';
// import { timeFormat } from 'd3-time-format';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const [originalDataResponse, evolutionDataResponse, rankingDataResponse] = await Promise.all([
		import('$lib/data/books.csv?raw'),
		import('$lib/data/Genre_Popularity_Over_Year.csv?raw'),
		import('$lib/data/Genre_Aggregated_Popularity_Over_Decade.csv?raw')
	]);

	const originalData = csvParse(originalDataResponse.default, parseOriginalData);
	const evolutionData = csvParse(evolutionDataResponse.default, autoType);
	const rankingData = csvParse(rankingDataResponse.default, autoType);

	return {
		originalData,
		evolutionData,
		rankingData
	};
}

function parseOriginalData(d) {
	return {
		id: +d.id,
		title: d.title,
		author: d.author,
		year: +d.year,
		date: new Date(d.date),
		genres: JSON.parse(d.genres),
		language: d.language,
		rating: +d.rating,
		numRatings: +d.numRatings,
		ratingsByStars: JSON.parse(d.ratingsByStars),
		bbeScore: +d.bbeScore,
		bbeVotes: +d.bbeVotes,
		coverImg: d.coverImg
	};
}

// export const ssr = false;
