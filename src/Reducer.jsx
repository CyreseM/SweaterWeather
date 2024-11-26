const Reducer = (state, action) => {
  switch (action.type) {
    case "rotate":
      return { ...state, rotationAngle: state.rotationAngle + 360 };
    case "displayname":
      return { ...state, displayName: action.payload };
    case "metric":
      return { ...state, units: "metric" };
    case "imperial":
      return { ...state, units: "imperial" };
    case "updateweather":
      return { ...state, weatherData: action.payload };
    default:
      return "Unrecognized command";
  }
};
export default Reducer;
