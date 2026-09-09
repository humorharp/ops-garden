import { QuartzComponent } from "./types";
// @ts-ignore
import script from "./scripts/readingVine.inline";
import style from "./styles/readingVine.scss";

const ReadingVine: QuartzComponent = () => null;
ReadingVine.afterDOMLoaded = script;
ReadingVine.css = style;
export default ReadingVine;
