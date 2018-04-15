const {AssetGuard} = require('./assetguard.js')
const ConfigManager = require('./configmanager.js')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')

console.log('Preloading')

// Load ConfigManager
ConfigManager.load()

// Ensure Distribution is downloaded and cached.
AssetGuard.retrieveDistributionDataSync(ConfigManager.getGameDirectory(), false)

// Resolve the selected server if its value has yet to be set.
if(ConfigManager.getSelectedServer() == null){
    console.log('Determining default selected server..')
    ConfigManager.setSelectedServer(AssetGuard.resolveSelectedServer(ConfigManager.getGameDirectory()))
    ConfigManager.save()
}

// Clean up temp dir incase previous launches ended unexpectedly. 
rimraf(path.join(os.tmpdir(), ConfigManager.getTempNativeFolder()), (err) => {
    if(err){
        console.warn('Error while cleaning temp dir', err)
    } else {
        console.log('Cleaned temp dir.')
    }
})