function userListLoad() {
	if (document.getElementById("userSearchListContainer") != null) {
		var containerHeight = $(window).height() - 80;
		$(window).resize(function(){
			$("#userSearchListContainer").height($(window).height() - 80)
		});
		setTimeout(function() {
				$("#userSearchListContainer").animate({"width": "100%"}, 500, "easeOutExpo");
				
				$("#userSearchListContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
					$("#userSearchListContainer").css("overflow", "auto");

				});
				setTimeout(function() {
					var containerHeight = $(window).height() - 55
					$("#userSearchListContainer").animate({"height": containerHeight}, 800, "easeOutBounce", function() {
						$("#userSearchListContainer").height(containerHeight);
					});
				},
					100
				);
			}, 300
		);
		var col1Children = $("#userCol1").children().length;
		var col2Children = $("#userCol2").children().length;

		if (col1Children == 0 && col2Children == 0) {
			$("#userSearchListContainer").append($("<div style = 'z-index: -1; position: absolute; height: 100%; width: 100%; text-align: center; '><h2 style = 'margin-top: 30%; '>Could not find any users</h2></div>"));
		}
	}
}


$(document).on("page:load", userListLoad);
$(document).ready(userListLoad);