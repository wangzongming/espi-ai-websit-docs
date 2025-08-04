import { defineClientConfig } from 'vuepress/client'

import Toy from "./layouts/toy/index.vue";

import './styles/index.scss'

export default defineClientConfig({
  layouts: {
    Toy
  },
})