// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(function() {
	var StandForm = React.createClass({
		getInitialState: function() {
			return {stand12:null, stand13: null, stand21: null, stand23: null, stand31: null, stand32: null}
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
			var standardInfo = {
				"stand12": this.state.stand12,
				"stand13": this.state.stand13,
				"stand23": this.state.stand23
			}
		   	$.ajax({
		    	type: "POST",
		      	url: "/admin",
		      	data: {"standardInfo": standardInfo}
		    })

		},
		render: function(){
			return (
				<form>
					项目名称:<input /><br />
					项目评估标准:<input /><input /><input /><br />
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

	var AddUser = React.createClass({
		getInitialState: function(){
			return{name:null, password:null}
		},
		handleChange: function(){
			var nextState = {};
			nextState["name"] =  this.refs.name.getDOMNode().value;
			nextState["password"] =  this.refs.password.getDOMNode().value;
			this.setState(nextState);
		},
		handleSubmit: function(){
		  var user = {
		    "name": this.state.name,
		    "password": this.state.password
		  };
		  $.ajax({
		    type: "POST",
		      url: "/users",
		      data: {"user": user}
		  });
		},
		render: function(){
			return (
				<div id="add-user">
					<form>
						专家名:<input value={this.state.name} ref="name" onChange={this.handleChange}/><br />
						密码:<input value={this.state.password} ref="password" onChange={this.handleChange}/><br />
						<input type="submit" value="添加用户" onClick={this.handleSubmit}/>
					</form>
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
						<a href="#add-user">添加专家</a>
					</li>
					<li className="tab">
						<a href="#analyze">敏感度分析</a>
					</li>
				</ul>
			);
		}
	})

	var Result = React.createClass({
		render: function(){
			return(
				<div>
					<p>结果信息:</p>
					方案一: 120分
					方案二: 70分
					方案三: 40分
				</div>
			);
		}
	});

	var Analyze= React.createClass({
		render: function() {
			return (
				<div id="analyze" className="analyze">
					<form>
						标准权重值:<br />
						<input /><br />
						<input /><br />
						<input /><br />
						<input type="submit" value="分析" onClick={this.handleSubmit}/>
					</form>
					<Result />
				</div>
			);
		}
	});

	var Admin = React.createClass({
		componentDidMount: function(){
			$('#tab-container').easytabs();
		},
		render: function(){
			return(
				<div id="tab-container" className="tab-container">
					<TabTitle />
					<StandardTable />
					<AddUser />
					<Analyze />
				</div>
			);
		}
	});

	React.render(<Admin />, document.getElementById('admin'));
})
