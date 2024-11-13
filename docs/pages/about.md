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
    title: '没有人能回到过去 但你可以现在开始',
    links: [
      { icon: 'github', link: 'https://github.com/ChinaCarlos' },
      { icon: 'instagram', link: 'https://juejin.cn/post/7409865546197893171'}
      ]
  },

]
</script>

<style>
  .about_page {
    margin-top:0!important;
  }
 .github {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
 }
 .github-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
 }



</style>

<VPTeamPage class="about_page">

  <VPTeamPageTitle class="title">
    <template #title>
      About Me
    </template> 
    <!-- <template #lead>
     一个普通能解决问题的前端开发
    </template> -->
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  >

  </VPTeamMembers>

<div class="github">

  <img src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=ChinaCarlos&theme=aura_dark" />
  <div class='github-content'>
    <img src="http://github-profile-summary-cards.vercel.app/api/cards/stats?username=ChinaCarlos&theme=aura_dark" />
      <img src="http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=ChinaCarlos&theme=aura_dark" />
  </div>

  <div class='github-content'>
    <img src="http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=ChinaCarlos&theme=aura_dark" />
    <img src="http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=ChinaCarlos&theme=aura_dark&utcOffset=8" />
  </div>

</div>

</VPTeamPage>
