import { defineNotesConfig } from 'vuepress-theme-plume' 
import dev from './dev'
import start from './start'
import clientConfig from './config-client'
import serverConfig from './config-server'
import example from './example'
import plugin from './plugin'

export const enNotes = defineNotesConfig({
  dir: 'en/notes',
  link: '/en/',
  notes: [
    start,
    example,
    clientConfig,
    serverConfig,
    plugin,
    dev, 
  ],
})