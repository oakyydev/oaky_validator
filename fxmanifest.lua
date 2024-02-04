fx_version 'cerulean'
game 'gta5'

author 'oaky'
description 'Provides multiple functions to validate user entered values.'

version '1.0.0'

client_scripts {
    'client/main.js'
}

files {
    'lang.json',
    'dist/*.js'
}

server_script 'server/versionChecker.lua'