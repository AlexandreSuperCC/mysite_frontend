<template>
  <div class="apps-and-pg-view">
    <article-list :articles="articlesSource"></article-list>
  </div>
</template>

<script>
import ArticleList from '@/components/project/ArticleList'

export default {
  name: "MyProject",
  components: { ArticleList },
  data () {
    return {
      articlesSource: [
        {
          id: 'smart-canteen',
          title: 'Smart Canteen',
          description: 'The smart restaurant big data cloud management platform is a big data control platform that is used for personalized customization of each restaurant and integrates client and background management.\n' +
              'The platform displays the restaurant\'s specialties in an all-round way, has online and offline ordering and checkout functions, and can use big data calculations to infer the favorite dishes of different customers and make personalized recommendations.\n' +
              'It greatly facilitates the background management of restaurants, enabling managers to monitor changes in restaurant traffic, demand, and raw materials in real time, and conduct big data analysis and forecasting of restaurant demand based on monitoring data, saving costs and increasing sales.',
          link: [
            {  text: '└(^o^)┘ Vue Springboot Websocket Hibernate Mysql Flask Sklearn' },
            { href: 'http://assets.cklovery.life/2023/02/17464670-互联网+商业计划书_watermark.pdf', text: 'Project Business Plan' },
            { href: 'https://github.com/AlexandreSuperCC/innovation_frontend', text: 'Code Source Frontend Github' },
            { href: 'https://github.com/AlexandreSuperCC/innovation_backend', text: 'Code Source Backend Github' },
          ],
          image: 'http://assets.cklovery.life/2023/02/18593291-innovation.png',
          isImage:true,
        },
        {
          id: 'computer-park',
          title: 'Computer Park',
          description: 'Universities have a computer park that includes all of the school\'s equipment. This infrastructure is generally used by teachers and students from different departments for courses and tps in networks and computer development.\n' +
              'The problem that arises relates to the management of this computer equipment insofar as this procedure is managed only by determined managers of IT-Support who carry out the mission of managing all the equipment in a traditional way, namely the periodic development of the inventory and the direct and on-site consultation of the state of the resources.',
          link: [
            {  text: '└(^o^)┘ Java Swing Mysql' },
            { href: 'http://assets.cklovery.life/2023/02/17465443-Cahier de charges AP4B.pdf', text: 'Requirement Specification' },
            { href: 'http://assets.cklovery.life/2023/02/17470022-YuanCao_XiaoyanLi_ZhongtianGuo_RAP_AP4B_watermark.pdf', text: 'Project Presentation' },
            { href: 'https://github.com/AlexandreSuperCC/computer_park_manager', text: 'Code Source Github' },
          ],
          image: 'http://assets.cklovery.life/2023/02/1902432-pres.mp4',
          isImage:false,
        },
        {
          id: 'docfetcher-audit',
          title: 'Project Audit for DocFetcher',
          description: 'DocFetcher is an Open Source desktop search application: It allows you to search the contents of files on your computer. — You can think of it as Google for your local files. The application runs on Windows, Linux and OS X. We made an audit report based on DocFetcher which presents the audited application, conclusions obtained, methodology used and course of the project, difficulties and reflections and proposals for the future.',
          link: [
            { href: 'http://assets.cklovery.life/2023/02/17470766-FatouGUEYE_YuanCAO_docfetcher_watermark.pdf', text: 'Audit Report' },
            { href: 'http://assets.cklovery.life/2023/02/1747125-FatouGUEYE_YuanCAO_docfetcher-ppt_watermark.pdf', text: 'Audit Presentation' },
            { href: 'http://assets.cklovery.life/2023/02/17515624-PrésentationTPAuditP22.pdf', text: 'Requirement Specification' },
            { href: 'https://github.com/AlexandreSuperCC/docfetcher', text: 'Docfetcher Code Source Github' },
          ],
          image: 'http://assets.cklovery.life/2023/02/19000283-audit.png',
          isImage:true,
        },
        {
          id: 'automobile',
          title: 'Automobile Online Shop',
          description: `A client wants a website for the online sale of spare parts for the automobile, for professional customers (garages). His idea is to offer his site with categories of parts in a tree structure from largest to smallest (for example, we start at the scale of the car, we go down to the openings, then to the controls, then to the buttons of window control, etc.). The client wants the choices of previous clients to guide the choice of customers on the site. It also wants to allow direct payment online.`,
          link: [
            {  text: '└(^o^)┘ Thymeleaf Bootstrap Springboot Hibernate Mysql' },
            { href: 'http://assets.cklovery.life/2023/02/17471794-MO54_Rapport_Web_watermark.pdf', text: 'Project Presentation' },
            { href: 'https://github.com/AlexandreSuperCC/automobile', text: 'Code Source Github' },
          ],
          image: 'http://assets.cklovery.life/2023/02/19000455-automobile.png',
          isImage:true,
        },
      ]
    }
  }

}
</script>

<style scoped>

</style>