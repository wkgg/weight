var ExitButton = React.createClass({
  onClick: function(){
    $.ajax({
      type: "DELETE",
        url: "/logout"
    }).done(function(){
      location.reload();
    });
  },
  render: function(){
    return (
      <button className="btn-danger exit" onClick={this.onClick}>退出</button>
    );
  }
});