var ShowUser = React.createClass({
    getInitialState: function(){
      return{users: []};
    },

    componentDidMount: function(){
      var url = this.props.url;

      $.get(url, function(result){
        this.setState({users: result})
      }.bind(this))
    },

    handleClick: function(user_id, name){
      console.log("id: ", user_id)
      $.ajax({
        type: "DELETE",
          url: "/users/" + user_id.toString()
      }).done(function(){
        location.reload();
      });
    },

    render: function(){
      rows = [];
      this.state.users.forEach(function(user){
        rows.push(<div>
            姓名: <input value={user.name} /> 
            密码: <input value={"******"} />
            <a className="btn btn-danger" onClick={this.handleClick.bind(null, user.id)}>Delete </a>
        </div>);
      }, this)
      return(
        <div>
          {rows}
        </div>
      );
    }
  });