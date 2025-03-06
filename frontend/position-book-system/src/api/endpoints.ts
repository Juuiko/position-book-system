export const API_VERSION = "/v1";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + API_VERSION || "";

export const ENDPOINTS = {
  events: {
    getAll: `${BASE_URL}/events`,
    getAllPositions: `${BASE_URL}/events/positions`,
    getAllEvents: `${BASE_URL}/events/all`,
    getById: (id: string) => `${BASE_URL}/events/${id}`,
    create: `${BASE_URL}/events/new-trades`,
    update: (id: string) => `${BASE_URL}/events/${id}`,
    search: (query: string) => `${BASE_URL}/events/search?q=${query}`,
  },
  admin: {
    clearDatabase: `${BASE_URL}/admin/delete-database`,
    populateDatabase: `${BASE_URL}/admin/populate-database`,
  },
};
