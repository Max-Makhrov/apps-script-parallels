// enum.js
export function Enum(baseEnum) {
  return new Proxy(baseEnum, {
    get(target, name) {
      if (!baseEnum.hasOwnProperty(name)) {
        throw new Error(`"${String(name)}" value does not exist in the enum`);
      }
      return baseEnum[name];
    },
    set(target, name, value) {
      throw new Error("Cannot add a new value to the enum");
    },
  });
}
