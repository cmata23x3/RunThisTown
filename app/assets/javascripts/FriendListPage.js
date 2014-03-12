
function friendListLoad() {
	if (document.getElementById("userListContainer") != null) {
		var containerHeight = $(window).height() - 80;
		$(window).resize(function(){
			$("#userListContainer").height($(window).height() - 80)
		});
		setTimeout(function() {
				$("#userListContainer").animate({"width": "100%"}, 500, "easeOutExpo");
				
				$("#userListContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
					$("#userListContainer").css("overflow", "auto");

				});
				setTimeout(function() {
					var containerHeight = $(window).height() - 55
					$("#userListContainer").animate({"height": containerHeight}, 800, "easeOutBounce", function() {
						$("#userListContainer").height(containerHeight);
					});
				},
					100
				);
			}, 300
		);
		var col1Children = $("#userCol1").children().length;
		var col2Children = $("#userCol2").children().length;

		if (col1Children == 0 && col2Children == 0) {
			$("#userListContainer").append($("<div style = 'z-index: -1; position: absolute; height: 100%; width: 100%; text-align: center; '><h2 style = 'margin-top: 30%; '>You have no friends :( <br> ...yet. Click the search bar above to look for people you know</h2></div>"));
			
			$("#userSearchListContainer").append($("<div style = 'z-index: -1; position: absolute; height: 100%; width: 100%; text-align: center; '><h2 style = 'margin-top: 30%; '>Could not find any users</h2></div>"));
		}
	}
}


$(document).on("page:load", friendListLoad);
$(document).ready(friendListLoad);


