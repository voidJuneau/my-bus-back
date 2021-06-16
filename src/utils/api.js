// about a line
const getStopCountOnLine = async (aId, lId) => {
  return await (await fetch(`/api/stops/${aId}/route/${lId}/count`)).json();
}
const getStopsOnLine = async (aId, lId, limit, page) => {
  if (page || limit) 
    return await (await fetch(`/api/stops/${aId}/route/${lId}?limit=${limit}&page=${page}`)).json();
  else
    return await (await fetch(`/api/stops/${aId}/route/${lId}`)).json();
}

export { getStopCountOnLine, getStopsOnLine }