import ReactRailsUJS from "react_ujs";
console.log('SciSoc scavanger hunt app loaded');

const componentRequireContext = require.context("scavenger_hunt", true);

ReactRailsUJS.useContext(componentRequireContext);