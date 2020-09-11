import ReactRailsUJS from "react_ujs";
import "../styles/scavenger_hunt.scss";


const componentRequireContext = require.context("scavenger_hunt", false);

ReactRailsUJS.useContext(componentRequireContext);
