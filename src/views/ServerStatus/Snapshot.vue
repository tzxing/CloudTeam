<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">View Master Snapshot</div>

      <div class="text item">
        <div>
          <el-date-picker
            v-model="msDate"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div style="margin-top: 1em">
          <el-button type="primary" v-on:click="clickMaster">查 看</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 0.5em">
      <div slot="header" class="clearfix">View Server Snapshot</div>

      <div class="text item">
        <div>
          <el-date-picker
            v-model="ssDate"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>

        <div style="margin-top: 0.5em">
          <el-select v-model="sValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div>
          <el-button
            style="margin-top: 0.5em"
            type="primary"
            :loading="ssLoading"
            v-on:click="clickServer"
            >查 看</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近半小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 1800 * 1000);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近四小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 4);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      sValue: 0,
      options: [],

      ssLoading: false,
      msDate: [new Date()- 1800 * 1000, new Date().getTime()],
      ssDate: [new Date()- 1800 * 1000, new Date().getTime()],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let that = this;
      let dd = await this.$axios.get("/getSnapshotInit").then((res) => {
        return res.data.data;
      });
      //console.log(dd);
      let index = 0;
      dd.ds.ds.forEach((d) => {
        that.options.push({ value: index++, label: d.ServerName });
        //that.options.push({value:index++,label:d.ServerName});
      });
    },

    async clickMaster() {
      let ids = await this.getIdRange(this.msDate);
      this.$router.replace("/serverstatus/master?mode=2&minId="+ids[0]+"&maxId="+ids[1]);
    },

    async clickServer() {
      //console.log(this.sValue);
      let ids = await this.getIdRange(this.ssDate);
       this.$router.replace("/serverstatus/server?mode=2&minId="+ids[0]+"&maxId="+ids[1]+"&sId="+this.sValue);
    },

    async getIdRange(d){
      d[0] = new Date(d[0]).getTime()/1000;
      d[1] = new Date(d[1]).getTime()/1000;
      return await this.$axios.get("/getIdRange", { params: { st: d[0], et: d[1] } }).then((res) => {
          return res.data.data.idRange;
        }).catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>
