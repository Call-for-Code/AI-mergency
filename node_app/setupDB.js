// get/initialize database
const dbClient = require('./db');

// Reset the demo DB to the state of before the first call came in.
exports.reset = () => {
  // drop existing tables
  dbClient.dropIncidentsTable();
  dbClient.dropCallsTable();
  dbClient.dropResponsesTable();

  // re-create tables
  dbClient.createIncidentsTable();
  dbClient.createCallsTable();
  dbClient.createResponsesTable();

  // insert sample data for map
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Oella Ave', 1231, null, 'rooftop', '-76.793715', '39.268488', 'person trapped', 'woman and cat', 1, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Oella Ave', 1206, '2', null, '-76.793583', '39.269569', 'building flooded', 'cellar', 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Frederick Rd', 4, null, 'Old Mill Cafe', '-76.793165', '39.267750', 'building flooded', null, 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Frederick Rd', 27, null, 'Wilkins-Rogers Inc', '-76.793669', '39.266446', 'building flooded', 'hazardous material (diesel)', 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Maryland Ave', 2701, '2', null, '-76.795282', '39.267507', 'building flooded', 'cellar', 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Mulligans Hill Ln', 3700, null, 'Ghost Town Tattoos', '-76.794976', '39.266621', 'person trapped', null, 3, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'St Paul St', 3701, '1', null, '-76.795277', '39.267041', 'building flooded', null, 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Main St', 8020, null, null, '-76.795099', '39.267866', 'building flooded', null, 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Main St', 8034, null, null, '-76.795277', '39.267786', 'building flooded', null, 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Main St', 8060, null, null, '-76.795803', '39.267645', 'building flooded', null, 0, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Main St', 8069, null, null, '-76.795892', '39.267493', 'person trapped', null, 2, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Main St', 8086, null, null, '-76.796228', '39.267528', 'person trapped', null, 1, null, 10]);
  dbClient.loadIncident(['In Progress', 'Ellicott City', 'Main St', 8202, '1', null, '-76.797814', '39.267547', 'person trapped', null, 2, null, 10]);

  // dbClient.disconnect();
};
