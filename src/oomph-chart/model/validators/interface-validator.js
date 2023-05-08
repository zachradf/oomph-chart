/* eslint-disable no-underscore-dangle */

import InterfaceTypes from '../types/interface-types.js';

const interfaceTypes = new InterfaceTypes();

// NOTE: 'iface' is used as 'interface' is a reserved word in JavaScript
export function verifyInterface(iface) {
  if (!iface || iface.length === 0 || !interfaceTypes[iface]) {
    console.error(`Unsupported interface: ${iface}`);
    return '';
  }

  return interfaceTypes[iface]._selfKey;
}
