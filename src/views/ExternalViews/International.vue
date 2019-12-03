<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu @select="show_details" :default-active="selected_name">
          <el-menu-item v-for="m in items" :key="m" :index="m">{{m}}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main v-if="showing_item_details">
        <h1>{{showing_item_details.long_title}}</h1>
        <el-divider></el-divider>
        <div class="text-html-details" v-html="showing_item_details.details"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface ItemDetails {
  name: string;
  long_title: string;
  details: string;
}

// TODO: 以后数据要从后端获取
const __items: string[] = [
  "智能无人集群系统会议",
  "研究室参展IROS 2019",
  "香港人工智能研讨会"
];
const __details: ItemDetails[] = [
  {
    name: "智能无人集群系统会议",
    long_title: "智能无人集群系统暨智能电网与能源变换会议顺利举行",
    details: `
    <p>智能无人集群系统控制理论与应用会议暨第五届智能电网与能源变换国际研讨会（The Conference on Intelligent Unmanned Swarm System Control Theory and Applications and Joint Workshop on Smart Grid and Energy Conversion）于2019年10月18-19日在北京理工大学国防科技园顺利举行。本次会议由北京理工大学自动化学院主办，中国指挥与控制学会云控制与决策专业委员会协办，并获得了北京市自然科学基金委员会对外交流合作项目和国家自然科学基金委员会国际(地区)合作与交流项目的资助，得到了北京理工大学相关部门的大力支持。</p>
    <img class="details-image" src="/statics/images/329.png"/>
    <p>本次会议由北京理工大学自动化学院院长夏元清教授主持，自动化学院党委书记金军出席会议并致辞，介绍了会议的背景，结合国家“人工智能”战略指出了无人集群系统与智能电网研究的前沿性和国家对该领域持续加大支持力度的趋势，并对各位嘉宾的到来表示了热烈欢迎。本次会议共有国内外40余所高校、科研单位与企业的150余名师生参会，听取会议专家报告，并与专家积极交流，就智能集群控制、人工智能和智能电网等领域的问题深入研讨。</p>
    <img class="details-image" src="/statics/images/327.png"/>`
  },
  {
    name: "研究室参展IROS 2019",
    long_title: "自动化学院网络化信息处理与控制研究室参展IROS 2019",
    details: `
    <p>机器人领域的“奥斯卡”——第32届IEEE智能机器人与系统国际会议(IROS 2019)于11月4到8日在中国澳门举行。来自世界各地的机器人、自动化系统及人工智能等领域的领军人物、顶尖研究团队及其企业界人士齐聚IROS 2019，共同探索智能机器人与系统领域的前沿科技，分享讨论相关领域的最新技术。在本届IROS会议上，自动化学院网络化信息处理与控制研究室的胡锐、林敏两位同学参加了该会议的展会。</p>
    <img class="details-image" src="/statics/images/337.png"/>
    <p>在本次会议中，一些世界领先的机器人制造商，如：KUKA、RealSense、LG Electronics、LeiShen Intelligence、宇树、大疆、美团等，都展出了自己的产品。美团新推出物流无人车，实现外卖自主配送；镭神智能展示了新型智能无人侦察平台，具备实时通信图传、双向传输控制遥控等技术，可实现定线巡逻、侦察攻击等功能；著名消费类电子制造商LG则凭借其在IT行业的优势技术，带来了服务机器人以及自动驾驶模拟器。目前全球机器人产业格局已经逐步形成，AI与IoT的结合将成为影响未来产业发展的颠覆性力量，引发智能商业时代的创新变革与无限可能。</p>`
  },
  {
    name: "香港人工智能研讨会",
    long_title: "香港人工智能研讨会",
    details: `<p>待更新……</p>`
  }
];

@Component({})
export default class InternationalView extends Vue {
  private items: string[] = [];
  private showing_item_details: ItemDetails = {
    name: "",
    long_title: "",
    details: ""
  };
  private selected_name: string = "";

  private fetch_group_members() {
    this.items = __items;
  }

  private fetch_item_details(name: string) {
    this.showing_item_details = __details.find(itm => itm.name == name)!;
  }

  public show_details(name: string) {
    this.fetch_item_details(name);
  }

  public mounted() {
    this.fetch_group_members();
    this.selected_name = this.items[0];
    this.show_details(this.selected_name);
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1200px;
}
</style>