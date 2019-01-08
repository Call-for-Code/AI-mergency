/**
 * Helper functions to deal with incidents
 */

export function getIconForType(type) {
  switch (type) {
    case 'Address':
      return '📍';
    case 'Person':
      return '👤';
    case 'Detail':
      return '⚠️';
    case 'Type':
      return '📯';
    default:
      return '❗️';
  }
}

export function nearby(a, b) {
  return a.ADDRESS_STREET === b.ADDRESS_STREET
    && a.ADDRESS_STREET_NB === b.ADDRESS_STREET_NB;
}

export function updateIncidentWithNluResults(oldIncident, entities) {
  let incident = oldIncident;
  entities.forEach((entity) => {
    switch (entity.type) {
      case 'Address_Street':
        incident = { ADDRESS_STREET: entity.text, ...incident };
        break;
      case 'Address_St_Number':
        incident = { ADDRESS_STREET_NB: entity.text, ...incident };
        break;
      case 'Person':
        incident = { LIVES_AT_RISK: entity.count, ...incident };
        break;
      case 'Detail':
        incident = {
          ...incident,
          DETAILS: incident.DETAILS ? `${incident.DETAILS}\n${entity.text}` : entity.text,
        };
        break;
      default:
    }
  });
  return incident;
}

export function mergeIncidents(newIncident, oldIncident) {
  let details = [oldIncident.DETAILS, newIncident.DETAILS].filter(x => x !== undefined);
  if (details.length > 0) {
    details = details.join('\n');
  } else {
    details = undefined;
  }
  let merged = {
    ...newIncident,
    ...oldIncident,
    mergeProposed: false,
    calls: [...oldIncident.calls, ...newIncident.calls],
    DETAILS: details,
  };
  if (newIncident.LIVES_AT_RISK > merged.LIVES_AT_RISK) {
    merged = { ...merged, LIVES_AT_RISK: newIncident.LIVES_AT_RISK };
  }
  return merged;
}

export function updateIncidentInDb(incident) {
  return fetch('/incident', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incident),
  });
}

export function parseIncidentFromDb(input) {
  const incident = input;
  // convert db default values to js undefined
  if (incident.LIVES_AT_RISK < 0) {
    delete incident.LIVES_AT_RISK;
  }
  return incident;
}
