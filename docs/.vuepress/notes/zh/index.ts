import { defineNotesConfig } from 'vuepress-theme-plume' 
import start from './start'
import clientConfig from './config-client'
import serverConfig from './config-server'
import example from './example'
import plugin from './plugin'

export const zhNotes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    start,
    example,
    clientConfig,
    serverConfig,
    plugin, 
  ],
})