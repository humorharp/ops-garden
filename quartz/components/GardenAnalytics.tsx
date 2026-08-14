import { QuartzComponent } from "./types"

// @ts-ignore
import script from "./scripts/gardenAnalytics.inline"

const GardenAnalytics: QuartzComponent = () => null

GardenAnalytics.afterDOMLoaded = script

export default GardenAnalytics
