export default class OomphInterface {
  constructor(interfaceType) {
    this.interface = interfaceType;
  }

  render() {
    console.log(`Rendering interface (placeholder): ${this.interface}`);
  }
}
