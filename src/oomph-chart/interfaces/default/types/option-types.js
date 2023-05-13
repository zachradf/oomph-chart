export default class DefaultOptionTypes {
  constructor() {
    const types = {
      menu: {
        menuText: ['Dataset 1', 'Dataset 2', 'Dataset 3'],
        menu: 'dropdown',
      },

      shape: {
        height: 50,
        width: 15,
        shapeType: 'rectangle',
        fillColor: 'red',
        labelText: 'SHAPE LABEL',
        initialX: 450,
        initialY: 450,
        radius: 30,
        rotation: 90,
        opacity: 0.4,
      },
    };

    Object.assign(this, types);
  }
}
