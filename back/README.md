* Line
  - all: api/lines (query, limit, page)
  - single: api/lines/{agencyId}/route/{routeId}

* Stop
  - all: api/stops (query, limit, page)
  - single: api/stops/{stopId}
  - by line: api/stops/{agencyId}/route/{routeId} (query, limit, page)
  - by line count: api/stops/{agencyId}/route/{routeId}/count