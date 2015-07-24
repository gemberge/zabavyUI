$.get( "/api/users/current", function(data) {
	$("#preloader").hide();
	$("#done").show();
	var lol = data.nickname.split(' ');
	var title = lol[0] + ' <span class="yellow">' + lol[1] + '</span>';
	$("#profile .title").html(title);
	$("#profile img").attr("src", data.photoUrl);

})
	.fail(function() {
		$("#preloader").hide();
		$("#auth").show();
		$(".socials a").click(function(e) {
			$("#preloader").show();
			$("#auth").hide();
		});
	});