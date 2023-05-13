export default class DefaultInterfaceTypes {
  constructor() {
    const types = {
      menu: {
        _selfKey: 'menu',
        name: 'Menu',
        nameLong: 'Menu Component',
      },
      shape: {
        _selfKey: 'shape',
        name: 'Shape',
        nameLong: 'Shape Component',
      },
    };

    Object.assign(this, types);
  }
}
