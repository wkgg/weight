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
      youbian:null, dianhua:null, qiyezhu:null,
      data_uri
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
      stand12:null, stand13: null,stand14:null, stand15: null,stand23: null,stand24: null, stand25: null,stand34: null, stand35: null,stand45: null,
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
  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result,
      });
    }

    reader.readAsDataURL(file);
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
        "stand4": this.state.stand4Name,
        "stand5": this.state.stand5Name
      },
      "standardInfo": {
        "stand12": this.state.stand12,
        "stand13": this.state.stand13,
        "stand14": this.state.stand14,
        "stand15": this.state.stand15,
        "stand23": this.state.stand23,
        "stand24": this.state.stand24,
        "stand25": this.state.stand25,
        "stand34": this.state.stand34,
        "stand35": this.state.stand35,
        "stand45": this.state.stand45
      },
      "file": this.state.data_uri
    }

    $.ajax({
      type: "POST",
        url: "/admin",
        data: {"project": project}
    })

  },
  render: function(){
    return (
      <form encType="multipart/form-data">
        项目名称:<input value={this.state.projectName} name="projectName" onChange={this.handleChange}/><br />
        项目评估标准:<input value={this.state.stand1Name} name="stand1Name" onChange={this.handleChange}/>
                  <input value={this.state.stand2Name} name="stand2Name" onChange={this.handleChange}/>
                  <input value={this.state.stand3Name} name="stand3Name" onChange={this.handleChange}/>
                  <input value={this.state.stand4Name} name="stand4Name" onChange={this.handleChange}/>
                  <input value={this.state.stand5Name} name="stand5Name" onChange={this.handleChange}/><br />
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
        <td>投标文件</td><input type="file" onChange={this.handleFile} />
        标准权重信息:<br />
        <input value="1" /><input value={this.state.stand12} name="stand12" onChange={this.handleChange} /><input value={this.state.stand13} name="stand13" onChange={this.handleChange} /><input value={this.state.stand14} name="stand14" onChange={this.handleChange} /><input value={this.state.stand15} name="stand15" onChange={this.handleChange} /><br />
        <input value="***" name="stand21" /><input value="1" /><input value={this.state.stand23} name="stand23" onChange={this.handleChange} /><input value={this.state.stand24} name="stand24" onChange={this.handleChange} /><input value={this.state.stand25} name="stand25" onChange={this.handleChange} /><br />
        <input value="***" name="stand31" /><input value="***" name="stand32" /><input value = "1" /><input value={this.state.stand34} name="stand34" onChange={this.handleChange} /><input value={this.state.stand35} name="stand35" onChange={this.handleChange} /><br />
        <input value="***" name="stand41" /><input value="***" name="stand42" /><input value = "***" name="stand43"/><input value = "1" name="stand44" /><input value={this.state.stand45} name="stand45" onChange={this.handleChange} /><br />
        <input value="***" name="stand51" /><input value="***" name="stand52" /><input value = "***" name="stand53"/><input value = "***" name="stand54" /><input value="1" name="stand55" /><br />
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
        <p>最终得分为:</p>
        方案1: {this.state.result[0]}<br />
        方案2: {this.state.result[1]}<br />
        方案3: {this.state.result[2]}<br />
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