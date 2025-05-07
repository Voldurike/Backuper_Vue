import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({ 
      empty: ''
    })
    , persist: true
  });

export const useStateStore = defineStore('state', {
    state: () => ({ 
      api_url: 'http://10.186.67.131:8000/',
      error: null
     })
  });