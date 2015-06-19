// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(function() {
	var StandForm = React.createClass({
		getInitialState: function() {
			return {projectName:null, stand1Name:null, stand2Name:null, stand3Name:null, stand12:null, stand13: null, stand21: null, stand23: null, stand31: null, stand32: null}
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
					标准权重信息:<br />
					<input value="1" /><input value={this.state.stand12} name="stand12" onChange={this.handleChange12} /><input value={this.state.stand13} name="stand13" onChange={this.handleChange13} /><br />
					<input value={this.state.stand21} name="stand21" onChange={this.handleChange12} /><input value="1" /><input value={this.state.stand23} name="stand23" onChange={this.handleChange23} /><br />
					<input value={this.state.stand31} name="stand31" onChange={this.handleChange13} /><input value={this.state.stand32} name="stand32" onChange={this.handleChange23} /><input value = "1" /><br />
					<input type="submit" value="投标" onClick={this.handleSubmit}/>
				</form>
			);
		}
	});

	var AddExpert = React.createClass({
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
		    "password": this.state.password,
		    "role": 1
		  };
		  $.ajax({
		    type: "POST",
		      url: "/users",
		      data: {"user": user}
		  }).done(function(){
		  	location.reload();
		  });
		},
		render: function(){
			return (
				<div id="add-expert">
					<ShowUser url="/users/role/1" />
					<form>
						专家名:<input value={this.state.name} ref="name" onChange={this.handleChange}/>
						密码:<input type="password" value={this.state.password} ref="password" onChange={this.handleChange}/>
						<input type="submit" className="btn btn-success" value="添加" onClick={this.handleSubmit}/>
					</form>
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
		    "password": this.state.password,
		    "role": 0
		  };
		  $.ajax({
		    type: "POST",
		      url: "/users",
		      data: {"user": user}
		  }).done(function(){
		  	location.reload();
		  });
		},
		render: function(){
			return (
				<div id="add-user">
					<ShowUser url="/users/role/0" />
					<form>
						投标人:<input value={this.state.name} ref="name" onChange={this.handleChange}/>
						密码:<input type="password" value={this.state.password} ref="password" onChange={this.handleChange}/>
						<input type="submit" className="btn btn-success" value="添加" onClick={this.handleSubmit}/>
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
						<a href="#add-expert">专家清单</a>
					</li>
					<li className="tab">
						<a href="#add-user">投标人清单</a>
					</li>
					<li className="tab">
						<a href="#result">查看结果</a>
					</li>
					<li className="tab">
						<a href="#analyze">敏感度分析</a>
					</li>
				</ul>
			);
		}
	})

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

	var Analyze= React.createClass({
		getInitialState: function(){
			return({
				stand12:null, stand13: null, stand23: null, result:[]
			});
		},
		handleSubmit: function(){
			var standardInfo =  {
        "stand12": this.state.stand12,
        "stand13": this.state.stand13,
        "stand23": this.state.stand23
      }
			$.ajax({
	      type: "POST",
	        url: "/admin/result-analyze",
	        data: {"standardInfo": standardInfo},
					success: function(data){
						this.setState({result: data});
					}.bind(this)	        
	    })
		},
		handleChange: function(e){
			var nextState = {}
			nextState[e.target.name] = e.target.value
			this.setState(nextState);
		},
		render: function() {
			return (
				<div id="analyze" className="analyze">
					<form>
		        标准权重信息:<br />
		        <input value="1" /><input value={this.state.stand12} name="stand12" onChange={this.handleChange} /><input value={this.state.stand13} name="stand13" onChange={this.handleChange} /><br />
		        <input value="***" name="stand21" /><input value="1" /><input value={this.state.stand23} name="stand23" onChange={this.handleChange} /><br />
		        <input value="***" name="stand31" /><input value="***" name="stand32" /><input value = "1" /><br />
		      </form>
		      <button onClick={this.handleSubmit}>分析</button>
		      <div>
						<p>分析结果:</p>
						方案1: {this.state.result[0]}<br />
						方案2: {this.state.result[1]}<br />
						方案3: {this.state.result[2]}<br />
					</div>
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
					<LogoutButton />
					<TabTitle />
					<AddExpert />
					<AddUser />
					<Result />
					<Analyze />
				</div>
			);
		}
	});

	React.render(<Admin />, document.getElementById('admin'));
})
