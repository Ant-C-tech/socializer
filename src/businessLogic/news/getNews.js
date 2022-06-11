import { apiClient } from '../../services/apiClient';

export const getNews = (apiKey, selectedCountry, nextPage) => {
		return (apiClient({
			method: 'get',
			baseURL: 'https://newsdata.io/api/1/news',
			params: {
				apikey: apiKey,
				country: selectedCountry.join().toLowerCase(),
				page: nextPage
			},
    }))();
};
