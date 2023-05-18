import interfaceInputHelper from './interface-input-helpers';

export function hasValidInterfaceArguments(visualizerInstance) {
  visualizerInstance.options.forEach((option, i) => {
    if (option.interfaceOptions) {
      if (Array.isArray(option.interfaceOptions) && option.interfaceOptions.length !== 0) {
        return interfaceInputHelper(option);
      }
      console.error('Invalid interface options detected. Interface options should be an array of objects.', option.interfaceOptions);

      return false;
    }

    return true;
  });

  return true;
}
