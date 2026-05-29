fx_version 'cerulean'
game 'gta5'

name 'showcase'
description 'RAGE:MP -> FiveM bridge showcase: one demo file per mp.* feature area.'
version '1.0.0'

-- Standalone mode: the bridge resource provides mp.* via @-imports. Each feature
-- file is a plain RAGE:MP-style script (uses the global `mp`), loaded in order.

server_scripts {
    '@ragemp-fivem-bridge/server.js',
    'server/01-events-commands.js',
    'server/02-players.js',
    'server/03-vehicles.js',
    'server/04-world-objects.js',
    'server/05-rpc.js',
    'server/06-prototype.js',
    'server/07-browsers.js',
}

client_scripts {
    '@ragemp-fivem-bridge/client.js',
    'client/01-events.js',
    'client/02-keys-cursor.js',
    'client/03-vehicles.js',
    'client/04-camera-raycast.js',
    'client/05-rpc.js',
    'client/06-prototype.js',
    'client/07-browsers.js',
}

-- The NUI root is the bridge's host shell; individual pages load as browser iframes.
ui_page 'ui/host.html'

files {
    'ui/host.html',
    'ui/index.html',
    'ui/index.css',
    'ui/index.js',
    'ui/_bridge.js',
}
