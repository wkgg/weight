var ProjectInfo = React.createClass({
  getInitialState: function(){
    return({
      project: {}
    });
  },
  componentDidMount: function(){
    $.ajax({
      url: '/admin/project',
      success:function(data) {
        this.setState({
          project: data
        });
      }.bind(this)
    });
  },
  render: function(){
    return(
      <div className="company-basic-info">
        <p>  企业基本信息</p>
        <table>
          <tr>
            <td>营业执照号</td>
            <td><input name="yingye" value={this.state.project.yingye}/></td>
          </tr>
          <tr>
            <td>企业名称</td>
            <td><input name="qiye" value={this.state.project.qiye}/></td>
          </tr>
          <tr>
            <td>注册地址</td>
            <td><input name="zhuce" value={this.state.project.zhuce}/></td>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td><input name="fading" value={this.state.project.fading}/></td>
            <td>注册资本</td>
            <td><input name="ziben" value={this.state.project.ziben}/></td>
          </tr>
          <tr>
            <td>公司类型</td>
            <td><input name="gongsi" value={this.state.project.gongsi}/></td>
            <td>登记机关</td>
            <td><input name="dengji" value={this.state.project.dengji}/></td>
          </tr>
          <tr>
            <td>成立日期</td>
            <td><input name="chengli" value={this.state.project.chengli}/></td>
            <td>营业期限</td>
            <td><input name="qixian" value={this.state.project.qixian}/></td>
          </tr>
          <tr>
            <td>经营范围</td>
            <td><input name="jingying" value={this.state.project.jingying}/></td>
          </tr>
          <tr>
            <td>税务登记账号</td>
            <td><input name="shuiwu" value={this.state.project.shuiwu}/></td>
            <td>组织机构代码证号</td>
            <td><input name="zuzhi" value={this.state.project.zuzhi}/></td>
          </tr>
          <tr>
            <td>贷款卡号码</td>
            <td><input name="daikuan" value={this.state.project.daikuan}/></td>
            <td>特许经营许可证号码</td>
            <td><input name="texu" value={this.state.project.texu}/></td>
          </tr>
          <tr>
            <td>联系地址</td>
            <td><input name="lianxi" value={this.state.project.lianxi}/></td>
            <td>邮编</td>
            <td><input name="youbian" value={this.state.project.youbian}/></td>
          </tr>
          <tr>
            <td>电话、传真</td>
            <td><input name="dianhua" value={this.state.project.dianhua}/></td>
          </tr>
          <tr>
            <td>企业主家</td>
            <td><input name="qiyezhu" value={this.state.project.qiyezhu}/></td>
          </tr>
        </table>
      </div>
    );
  }
});