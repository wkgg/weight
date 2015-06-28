// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var StandForm1 = React.createClass({
  getInitialState: function(){
    return({
      score11:null, score12:null, score13:null, score14:null, score15:null,
      score21:null, score22:null, score23:null, score24:null, score25:null,
      score31:null, score32:null, score33:null, score34:null, score35:null,
      standard: ["0","0", "0"]
    });
  },
	handleSubmit: function(){
    var scoreInfo = {
      score11: this.state.score11,score12: this.state.score12,score13: this.state.score13, score14: this.state.score14,score15: this.state.score15,
      score21: this.state.score21,score22: this.state.score22,score23: this.state.score23, score24: this.state.score24,score25: this.state.score25,
      score31: this.state.score31,score32: this.state.score32,score33: this.state.score33, score34: this.state.score34,score35: this.state.score35,
    }
   	$.ajax({
    	type: "POST",
      	url: "/scores",
      	data: {"score": scoreInfo}
    })

	},
  handleChange: function(e){
    var nextState = {};
    nextState[event.target.name] = e.target.value;
    this.setState(nextState);
  },
  componentWillMount: function(){
    $.ajax({
      url: '/admin/standard',
      success:function(data) {
        this.setState({
          standard: data
        });
      }.bind(this)
    });
  },
	render: function(){
		return (
      <div id="score" className="score">
  			<form>
          <div className="standard">{this.state.standard[0]}</div><div className="standard">{this.state.standard[1]}</div><div className="standard">{this.state.standard[2]}</div><div className="standard">{this.state.standard[3]}</div><div className="standard">{this.state.standard[4]}</div><br />
          方案一<input name="score11" onChange={this.handleChange}/><input name="score12" onChange={this.handleChange}/><input name="score13" onChange={this.handleChange}/><input name="score14" onChange={this.handleChange}/><input name="score15" onChange={this.handleChange}/><br />
          方案二<input name="score21" onChange={this.handleChange}/><input name="score22" onChange={this.handleChange}/><input name="score23" onChange={this.handleChange}/><input name="score24" onChange={this.handleChange}/><input name="score25" onChange={this.handleChange}/><br />
          方案三<input name="score31" onChange={this.handleChange}/><input name="score32" onChange={this.handleChange}/><input name="score33" onChange={this.handleChange}/><input name="score34" onChange={this.handleChange}/><input name="score35" onChange={this.handleChange}/><br />
  				<input type="submit" value="Post" onClick={this.handleSubmit}/>
  			</form>
      </div>
		);
	}
});

var Result1 = React.createClass({
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
      <div id="result1" className="result1">
        <p>最终得分为:</p>
        方案1: {this.state.result[0]}<br />
        方案2: {this.state.result[1]}<br />
        方案3: {this.state.result[2]}<br />
      </div>
    );
  }
});

var TabTitle1 = React.createClass({
  render: function(){
    return(
      <ul className="etabs">
        <li className="tab">
          <a href="#score">评分</a>
        </li>
        <li className="tab">
          <a href="#result1">查看结果</a>
        </li>
      </ul>
    );
  }
});

var ScoreTable = React.createClass({
  componentDidMount: function(){
    $('#tab-container').easytabs();
  },
	render: function() {
		return (
			<div id="tab-container" className="tab-container">
				<h1>投标管理系统</h1>
        <LogoutButton />
				<p>专家评分</p>
        <TabTitle1 />
        <StandForm1 />
        <Result1 />
			</div>
		);
	}
});

var ScoreAdd = React.createClass({
	render: function(){
		return (
			<div>
				<ScoreTable />
			</div>
		);
	}
});
