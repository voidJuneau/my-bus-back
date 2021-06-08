* Line
  - all: api/lines
  - single: api/lines/{agencyId}/route/{routeId}

* Stop
  - all: api/stops
  - single: api/stops/{stopId}
  - by line: api/stops/{agencyId}/route/{routeId}
