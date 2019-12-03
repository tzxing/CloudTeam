<template>
  <el-container>
    <el-aside>
      <el-menu @select="show_details" :default-active="selected_name">
        <el-menu-item v-for="m in member_names" :key="m" :index="m">{{m}}</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <h1>{{showing_member_details.long_title}}</h1>
      <el-divider></el-divider>
      <div class="text-html-details" v-html="showing_member_details.details"></div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface MemberDetails {
  name: string;
  long_title: string;
  details: string;
}

// TODO: 以后数据要从后端获取
const __items: string[] = ["实验室简介", "夏元清"];
const __details: MemberDetails[] = [
  { name: "实验室简介", long_title: "网络化信息处理与控制研究室", details: `` },
  {
    name: "夏元清",
    long_title: "夏元清",
    details: `<img class="details-image" style="width: 10%;" src="/statics/images/336.jpg"></img>
  <p>姓 名：夏元清</p>
  <p>学 历：博 士</p>
  <p>在本项目中承担的任务：负责全面工作</p>
<p>学习、 工作、 研究经历：</p>
<p>2017 入选享受国务院特殊津贴专家</p>
<p>2016 Elsevier中国高被引学者</p>
<p>2016 入选国家“万人计划”领军人才</p>
<p>2016 北京理工大学讲席教授</p>
<p>2015 Elsevier中国高被引学者</p>
<p>2015 获聘教育部“长江学者”特聘教授</p>
<p>2014 Elsevier中国高被引学者</p>
<p>2013.08- 入选科技部中青年科技创新领军人才</p>
<p>2012.06- 获国家杰出青年科学基金</p>
<p>2012.01- 至今 北京理工大学徐特立特聘教授</p>
<p>2008. 06- 至 今 北京理工大学自动化学院教授，博士生导师。</p>
<p>2007.02-2008.06 奥地利因斯布鲁克医科大学研究人员 从事生物医学信号处理等研究.</p>
<p>2004.07-2008.06 北京理工大学信息科学技术学院 副教授.</p>
<p>2004.02-2006.02 英国格拉摩根大学电子学院高级研究学者，主要从事于网络化控制研究.</p>
<p>2003.11-2004.02 新加坡国立大学电子与计算机工程系博士后，主要从事变结构控制研究.</p>
<p>2001.12-2003.11 中国科学院数学与系统科学研究院,系统科学研究所博士后，主要从事自抗扰控制技术在导航、制导与控制中应用研究</p>
<p>1998.09-2001.12 就读于北京航空航天大学第七研究室，专业为控制理论与控制工程，方向为鲁棒控制及其应用，获得工学博士学位</p>
<b>获 奖</b>
<p>2010年北京市科学技术二等奖（排名第一，夏元清、付梦印、杨毅、邓志红、张金会、王美玲、刘彤、张继伟、王清哲、张晓晨）：多源信息复杂系统控制基础理论与方法</p>
<p>2011年国家科技进步二等奖（排名第二，付梦印、夏元清、周培德、邓志红、杨毅、王美玲、张继伟、刘彤、张金会、张晓晨）：多源信息环境下自主地面移动平台导航、控制及应用</p>
<p>2012年教育部自然科学二等奖（排名第一，夏元清、付梦印、任雪梅、邓志红、张金会、杨洪玖）：网络化控制系统分析与综合</p>
<p>2015年北京市科学技术二等奖（排名第一，夏元清、付梦印、任雪梅、邓志红、闫莉萍、李春明）：多传感器网络系统信息融合与控制基础理论及应用</p>
<p>发表文章：在Springer等出版英文专著8部, 在各类刊物发表文章180多篇，主要包括鲁棒控制、变结构控制、飞行器控制、机器人控制、自抗扰控制技术、网络化控制方面的文章。</p>
<p>主持项目：国家杰出青年科学基金、国家自然科学基金、973子项等17项</p> 
<p>夏元清教授是教育部长江学者特聘教授、国家杰出青年基金获得者、国家万人计划入选者、北京理工大学徐特立特聘教授、教育部新世纪优秀人才、北京航空航天大学博士、新加坡国立大学电子与计算机工程系博士后、英国格拉摩根大学电子学院高级研究学者、奥地利因斯布鲁克医科大学客座教授，在相关国际期刊发表论文 SCI 150 余篇，并已在 Springer、CRC 及 Wiley 出版社出版专著 8 部，2011 年获国家科技进步二等奖一项（第 2 完成人）、获得北京市科学技术二等奖 2 项（第 1 完成人）、2012 年获教育部自然科学二等奖（第 1 完成人）。夏元清教授曾担任国家自然科学基金委员会自动化专家评审组成员（2010-2012），International Journal of Innovational Computing & Information Control、《自动化学报》、《控制理论与应用》、《系统科学与数学》等期刊编委，以及美国 ACC、the International Society for Measurement and Control (ISA) Conference Board 副编辑等学术职务。</p>`
  }
];

@Component({})
export default class OurGroupView extends Vue {
  private member_names: string[] = [];
  private showing_member_details: MemberDetails = {
    name: "",
    long_title: "",
    details: ""
  };
  private selected_name: string = "";

  private fetch_group_members() {
    this.member_names = __items;
  }

  private fetch_member_details(name: string) {
    this.showing_member_details = __details.find(itm => itm.name == name)!;
  }

  public show_details(name: string) {
    this.fetch_member_details(name);
  }

  public mounted() {
    this.fetch_group_members();
    this.selected_name = this.member_names[0];
    this.show_details(this.selected_name);
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1200px;
}
</style>