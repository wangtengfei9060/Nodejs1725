
$('#login').click(function(){
		$.ajax({
			type:"get",
			url:"/api/login",
			data: {
				username : $('#username').val(),
				pwd : $('#pwd').val()
			},
			success : function(res){
				console.log( res );
			}
		});
	}
)

$('#username').focus(function(){
	this.value = "";
})

$('#pwd').focus(function(){
	this.value = "";
})
