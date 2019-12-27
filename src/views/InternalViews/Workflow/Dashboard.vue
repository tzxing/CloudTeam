<template>
  <div>


<p>
	&nbsp;&nbsp;&nbsp;&nbsp;课题4系统开发遵照 CNCF 对云原生系统开发过程的约定，以高可用性和响应性，及通过自主和自修复能力实现的强大恢复能力和灵活性为目标，采用云原生组件定义全流程，前后端分离架构，构建了以容器为中心的开发、测试和部署的云原生系统。
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;为支持云原生系统的开发、部署和运维，同步建设了云原生生态平台。<br />
&nbsp;&nbsp;&nbsp;&nbsp;具体功能：<br />
<strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong><strong>用户管理</strong>
</p>
<p>
	<ul>
		<ul>
			<li>
				用户登录、注册
			</li>
			<li>
				基于角色的权限管理
			</li>
			<li>
				管理员后台对用户实体的 UD 操作
			</li>
		</ul>
	</ul>
<strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong><strong>工作流管理</strong>
</p>
<p>
	<ul>
		<ul>
			<li>
				工作流模版以可视化（包含自动布局）拖拽方式构建
			</li>
			<li>
				工作流模版的复制、修改、分享（可针对分享关系进行 CRD 操作）和可视化展示
			</li>
		</ul>
	</ul>
<strong>&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;工作流实例管理</strong>
</p>
<p>
	<ul>
		<ul>
			<li>
				运行具体工作流实例并展示实时运行结果
			</li>
			<li>
				工作流实例的管理功能<strong>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
			</li>
		</ul>
	</ul>
</p>
<p>
	<br />
</p>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class DashboardView extends Vue {
}
</script>
