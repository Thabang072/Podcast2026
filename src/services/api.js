const API_BASE_URL = "https://podcast-api.netlify.app";

export const SHOWS_URL = `${API_BASE_URL}/shows`;

export const getShowURL = (id) => `${SHOWS_URL}/${id}`;