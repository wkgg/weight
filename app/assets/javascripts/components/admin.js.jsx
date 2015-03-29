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
					<input value="1" /><input value={this.state.stand12} name="stand12" onChange={this.handleChange12} /><input value={this.state.stand13} name="stand13" onChange={this.handleChange13} /><br />
					<input value={this.state.stand21} name="stand21" onChange={this.handleChange12} /><input value="1" /><input value={this.state.stand23} name="stand23" onChange={this.handleChange23} /><br />
					<input value={this.state.stand31} name="stand31" onChange={this.handleChange13} /><input value={this.state.stand32} name="stand32" onChange={this.handleChange23} /><input value = "1" /><br />
					<input type="submit" value="Post" onClick={this.handleSubmit}/>
				</form>
			);
		}
	});
	var StandardTable = React.createClass({
		render: function() {
			return (
				<div>
					<p>标准信息</p>
					<StandForm />
				</div>
			);
		}
	});

	var ResultArea = React.createClass({
		render: function() {
			return (
				<div>
					<p>结果信息</p>
					<div>方案一: 190分</div>
					<div>方案三: 130分</div>
					<div>方案二: 100分</div>
				</div>
			);
		}
	});

	var Admin = React.createClass({
		render: function() {
			return (
				<div>
					<StandardTable />
					<ResultArea />
				</div>
			);
		}
	});

	React.render(<Admin />, document.getElementById('test'));
})
