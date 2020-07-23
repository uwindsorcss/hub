import ReactRailsUJS from "react_ujs";
import "../styles/scavenger_hunt.scss";

console.log('SciSoc scavanger hunt app loaded');

const componentRequireContext = require.context("scavenger_hunt", false);

ReactRailsUJS.useContext(componentRequireContext);