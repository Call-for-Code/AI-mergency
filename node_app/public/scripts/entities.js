
// Find an address if there is one
function mergeAddresses(entities) {
  const houseNbrIdx = entities.findIndex(entity => entity.type === 'Address_St_Number');
  const streetIdx = entities.findIndex(entity => entity.type === 'Address_Street');
  if (streetIdx >= 0 && houseNbrIdx >= 0) {
    const address = [entities[houseNbrIdx].text, entities[streetIdx].text].join(' ');
    return entities.concat([{ type: 'Address', text: address }]);
  }
  return entities;
}

export function enrichEntities(entities, text) {
  return mergeAddresses(entities)
    .map((entity) => {
      const start = text.indexOf(entity.text);
      const end = start + entity.text.length;
      return { ...entity, start, end };
    })
    .sort((a, b) => a.start - b.start);
}
