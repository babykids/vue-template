<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon name="language" class="international-icon" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, i) in languageData"
        :key="i"
        :disabled="language === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import settings from '../../settings'
@Component({
  name: 'Login'
})
export default class extends Vue {
  get language () {
    return AppModule.language
  }

  private languageData = [
    { label: '中文', value: 'zh' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: '日本語', value: 'ja' },
    { label: '한국어', value: 'ko' },
    { label: 'Italiano', value: 'it' }
  ]

  private handleSetLanguage (lang: string) {
    this.$i18n.locale = lang
    AppModule.SetLanguage(lang)
    // document.documentElement.lang = lang
    const { title } = this.$route.meta
    const docTitle = title
      ? `${this.$t(`route.${title}`)} - ${settings.title}`
      : `${settings.title}`
    document.title = docTitle
    this.$message({
      message: this.$t('components.changeLanguageTips').toString(),
      type: 'success'
    })
  }
}
</script>
