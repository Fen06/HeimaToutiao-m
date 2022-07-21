import storage from './storage'
const TOKEN_KEY = 'HEIMA_TOUTIAO'
const SEARCH_KEY = 'SEARCH_KEY'
export const getToken = () => storage.get(TOKEN_KEY)

export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const removeToken = () => storage.remove(TOKEN_KEY)

export const setSearch = (SearchInfo) => storage.set(SEARCH_KEY, SearchInfo)

export const getSearch = () => storage.get(SEARCH_KEY)
