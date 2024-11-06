---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
const members = [
  {
    avatar: 'https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/avatar.png',
    name: 'Carlos',
    title: 'Develop',
    links: [
      { icon: 'github', link: 'https://github.com/ChinaCarlos' },
      { icon: 'twitter', link: 'https://juejin.cn/post/7409865546197893171'}
      ]
  },

]
</script>

<style>

</style>

<VPTeamPage class="about_page">
  <VPTeamPageTitle>
    <template #title>
      About Me
    </template>
    <template #lead>
     一个普通能解决问题的前端开发
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
