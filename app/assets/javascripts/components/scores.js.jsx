// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var StandForm1 = React.createClass({
  getInitialState: function(){
    return({
      score11:null, score12:null, score13:null,
      score21:null, score22:null, score33:null,
      score31:null, score32:null, score33:null
    });
  },
	handleSubmit: function(){
    var scoreInfo = {
      score11: this.state.score11,score12: this.state.score12,score13: this.state.score13,
      score21: this.state.score21,score22: this.state.score22,score23: this.state.score23,
      score31: this.state.score31,score32: this.state.score32,score33: this.state.score33,
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
	render: function(){
		return (
      <div id="score" className="score">
  			<form>
          方案一<input name="score11" onChange={this.handleChange}/><input name="score12" onChange={this.handleChange}/><input name="score13" onChange={this.handleChange}/><br />
          方案二<input name="score21" onChange={this.handleChange}/><input name="score22" onChange={this.handleChange}/><input name="score23" onChange={this.handleChange}/><br />
          方案三<input name="score31" onChange={this.handleChange}/><input name="score32" onChange={this.handleChange}/><input name="score33" onChange={this.handleChange}/><br />
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
        <p>第二步修改后的权重系数分别为:</p>
        w1: {this.state.result[0]}<br />
        w2: {this.state.result[1]}<br />
        w3: {this.state.result[2]}<br />
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
        <ExitButton />
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
