import { defineNotesConfig } from 'vuepress-theme-plume'
import dev from './dev'
import start from './start'
import clientConfig from './config-client'
import serverConfig from './config-server'
import example from './example'
import plugin from './plugin'

export const jaNotes = defineNotesConfig({
  dir: 'ja/notes',
  link: '/ja/',
  notes: [
    start,
    example,
    clientConfig,
    serverConfig,
    plugin,
    dev,
  ],
})
