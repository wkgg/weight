// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


var CompanyInformation = React.createClass({
  getInitialState: function(){
    return({
      yingye:null, qiye:null, zhuce:null,
      fading:null, ziben:null, gongsi:null,
      dengji:null, chengli:null, qixian:null,
      jingying:null, shuiwu:null, zuzhi:null,
      daikuan:null, texu:null, lianxi:null,
      youbian:null, dianhua:null, qiyezhu:null
    });
  },
  handleChange: function(e){
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  },
  render: function(){
    return(
      <div className="company-basic-info">
        <p>  企业基本信息</p>
        <table>
          <tr>
            <td>营业执照号</td>
            <td><input name="yingye" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>企业名称</td>
            <td><input name="qiye" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>注册地址</td>
            <td><input name="zhuce" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td><input name="fading" onChange={this.handleChange}/></td>
            <td>注册资本</td>
            <td><input name="ziben" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>公司类型</td>
            <td><input name="gongsi" onChange={this.handleChange}/></td>
            <td>登记机关</td>
            <td><input name="dengji" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>成立日期</td>
            <td><input name="chengli" onChange={this.handleChange}/></td>
            <td>营业期限</td>
            <td><input name="qixian" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>经营范围</td>
            <td><input name="jingying" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>税务登记账号</td>
            <td><input name="shuiwu" onChange={this.handleChange}/></td>
            <td>组织机构代码证号</td>
            <td><input name="zuzhi" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>贷款卡号码</td>
            <td><input name="daikuan" onChange={this.handleChange}/></td>
            <td>特许经营许可证号码</td>
            <td><input name="texu" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>联系地址</td>
            <td><input name="lianxi" onChange={this.handleChange}/></td>
            <td>邮编</td>
            <td><input name="youbian" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>电话、传真</td>
            <td><input name="dianhua" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>企业主家</td>
            <td><input name="qiyezhu" onChange={this.handleChange}/></td>
          </tr>
        </table>
      </div>
    );
  }
});

var StandForm = React.createClass({
  getInitialState: function() {
    return {projectName:null, stand1Name:null, stand2Name:null, stand3Name:null, 
      stand12:null, stand13: null, stand21: null, stand23: null, stand31: null, stand32: null,
      yingye:null, qiye:null, zhuce:null,
      fading:null, ziben:null, gongsi:null,
      dengji:null, chengli:null, qixian:null,
      jingying:null, shuiwu:null, zuzhi:null,
      daikuan:null, texu:null, lianxi:null,
      youbian:null, dianhua:null, qiyezhu:null
    }
  },
  handleChange: function(event){
    var nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  },
  handleChange12: function(e){
    var nextState = {};
    nextState["stand21"] = nextState["stand12"] = e.target.value;
    this.setState(nextState);
  },
  handleChange13: function(e){
    var nextState = {};
    nextState["stand31"] = nextState["stand13"] = e.target.value;
    this.setState(nextState);
  },
  handleChange23: function(e){
    var nextState = {};
    nextState["stand23"] = nextState["stand32"] = e.target.value;
    this.setState(nextState);
  },
  handleSubmit: function(e){
    var project = {
      "name": this.state.projectName,
      "yingye":this.state.yingye,
      "qiye":this.state.qiye,
      "zhuce":this.state.zhuce,
      "fading":this.state.fading,
      "ziben":this.state.ziben,
      "gongsi":this.state.gongsi,
      "dengji":this.state.dengji,
      "chengli":this.state.chengli,
      "qixian":this.state.qixian,
      "jingying":this.state.jingying,
      "shuiwu":this.state.shuiwu,
      "zuzhi":this.state.zuzhi,
      "daikuan":this.state.daikuan,
      "texu":this.state.texu,
      "lianxi":this.state.lianxi,
      "youbian":this.state.youbian,
      "dianhua":this.state.dianhua,
      "qiyezhu":this.state.qiyezhu,
      
      "standName": {
        "stand1": this.state.stand1Name,
        "stand2": this.state.stand2Name,
        "stand3": this.state.stand3Name,
      },
      "standardInfo": {
        "stand12": this.state.stand12,
        "stand13": this.state.stand13,
        "stand23": this.state.stand23
      }
    }

    $.ajax({
      type: "POST",
        url: "/admin",
        data: {"project": project}
    })

  },
  render: function(){
    return (
      <form>
        项目名称:<input value={this.state.projectName} name="projectName" onChange={this.handleChange}/><br />
        项目评估标准:<input value={this.state.stand1Name} name="stand1Name" onChange={this.handleChange}/>
                  <input value={this.state.stand2Name} name="stand2Name" onChange={this.handleChange}/>
                  <input value={this.state.stand3Name} name="stand3Name" onChange={this.handleChange}/><br />
        <div className="company-basic-info">
        <p>  企业基本信息</p>
        <table>
          <tr>
            <td>营业执照号</td>
            <td><input name="yingye" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>企业名称</td>
            <td><input name="qiye" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>注册地址</td>
            <td><input name="zhuce" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td><input name="fading" onChange={this.handleChange}/></td>
            <td>注册资本</td>
            <td><input name="ziben" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>公司类型</td>
            <td><input name="gongsi" onChange={this.handleChange}/></td>
            <td>登记机关</td>
            <td><input name="dengji" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>成立日期</td>
            <td><input name="chengli" onChange={this.handleChange}/></td>
            <td>营业期限</td>
            <td><input name="qixian" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>经营范围</td>
            <td><input name="jingying" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>税务登记账号</td>
            <td><input name="shuiwu" onChange={this.handleChange}/></td>
            <td>组织机构代码证号</td>
            <td><input name="zuzhi" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>贷款卡号码</td>
            <td><input name="daikuan" onChange={this.handleChange}/></td>
            <td>特许经营许可证号码</td>
            <td><input name="texu" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>联系地址</td>
            <td><input name="lianxi" onChange={this.handleChange}/></td>
            <td>邮编</td>
            <td><input name="youbian" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>电话、传真</td>
            <td><input name="dianhua" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>企业主家</td>
            <td><input name="qiyezhu" onChange={this.handleChange}/></td>
          </tr>
        </table>
      </div>
        标准权重信息:<br />
        <input value="1" /><input value={this.state.stand12} name="stand12" onChange={this.handleChange12} /><input value={this.state.stand13} name="stand13" onChange={this.handleChange13} /><br />
        <input value={this.state.stand21} name="stand21" onChange={this.handleChange12} /><input value="1" /><input value={this.state.stand23} name="stand23" onChange={this.handleChange23} /><br />
        <input value={this.state.stand31} name="stand31" onChange={this.handleChange13} /><input value={this.state.stand32} name="stand32" onChange={this.handleChange23} /><input value = "1" /><br />
        <input type="submit" value="投标" onClick={this.handleSubmit}/>
      </form>
    );
  }
});

var StandardTable = React.createClass({
  render: function() {
    return (
      <div id="add-standard" clasName="add-stanrard">
        <StandForm />
      </div>
    );
  }
});

var Result = React.createClass({
  getInitialState: function(){
    return {result: []}
  },
  componentDidMount: function(){
    $.ajax({
      url: '/admin/result',
      success:function(data) {
        this.setState({
          result: data
        });
      }.bind(this)
    });
  },
  render: function(){
    return(
      <div id="result">
        <p>第二步修改后的权重系数分别为:</p>
        w1: {this.state.result[0]}<br />
        w2: {this.state.result[1]}<br />
        w3: {this.state.result[2]}<br />
      </div>
    );
  }
});
var TabTitle = React.createClass({
  render: function(){
    return(
      <ul className="etabs">
        <li className="tab">
          <a href="#add-standard">投标</a>
        </li>
        <li className="tab">
          <a href="#result">查看结果</a>
        </li>
      </ul>
    );
  }
})

var Standard = React.createClass({
  componentDidMount: function(){
    $('#tab-container').easytabs();
  },
  render: function(){
    return(
      <div id="tab-container" className="tab-container">
        <h1>投标管理系统</h1>
        <LogoutButton />
        <p>投标人投标</p>
        <TabTitle />
        <StandardTable />
        <Result />
      </div>
    );
  }
});