let navigate;

export const setNavigator = (navFn) => {
  navigate = navFn;
};

export const navigateTo = (...args) => {
  if (navigate) {
    navigate(...args);
  } else {
    console.warn("Navigator not set");
  }
};