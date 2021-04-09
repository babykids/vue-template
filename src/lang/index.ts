import Vue from 'vue'
// import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
import enEle from 'element-ui/lib/locale/lang/en'
import zhEle from 'element-ui/lib/locale/lang/zh-CN'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...enEle
  },
  zh: {
    ...zhLocale,
    ...zhEle
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    document.documentElement.lang = cookieLanguage
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      document.documentElement.lang = locale
      return locale
    }
  }

  // Default language is english
  return 'en'
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
})

// locale.i18n((key:string, value:string) => i18n.t(key, value))
// Vue.prototype.$tt = function (name:string, obj:any):string {
//   const f = this.$te(name)
//   return f ? this.$t(name, obj) : name.replace(/^[1-9|a-z|A-Z|\p{Unified_Ideograph}]+\./u, '')
// }

export default i18n
