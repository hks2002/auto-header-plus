import packJson from '../../package.json'
const styleC = packJson.contributes.configuration.properties['auto-header-plus.style.0'].default

const styleHtml = packJson.contributes.configuration.properties['auto-header-plus.style.1'].default
const stylePy = packJson.contributes.configuration.properties['auto-header-plus.style.2'].default
const styleVb = packJson.contributes.configuration.properties['auto-header-plus.style.3'].default
const styleShell = packJson.contributes.configuration.properties['auto-header-plus.style.4'].default
const styleLua = packJson.contributes.configuration.properties['auto-header-plus.style.5'].default

export { styleC, styleHtml, stylePy, styleVb, styleShell, styleLua }
