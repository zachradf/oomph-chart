export default function combineOptions(...options) {
  const combinedOptions = {};

  options.forEach((opt) => {
    Object.keys(opt).forEach((key) => {
      if (!(key in combinedOptions) || opt.priority.includes(key)) {
        combinedOptions[key] = opt[key];
      }
    });
  });
  console.log(combinedOptions);
  return combinedOptions;
}
