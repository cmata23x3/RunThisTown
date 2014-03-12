function aRoutesPageLoad() {
	if (document.getElementById("routeSearchContainer") != null) {
		var containerHeight = $(window).height() - 55;
		$(window).resize(function(){
			$("#routeSearchContainer").height($(window).height() - 55)
		});
		setTimeout(function() {
			$("#routeSearchContainer").animate({"width": "100%", "padding": "10px"}, 500, "easeOutExpo");
			
			$("#routeSearchContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
				$("#routeSearchContainer").css("overflow", "auto");
			});
			/*setTimeout(function() {
				var containerHeight = $(window).height() - 55
				$("#routeListContainer").animate({"height": containerHeight}, 800, "easeOutBounce");
			},
				100
				);*/
		}, 300);	
		$(".profRouteEntry").on("click", function() {
			if ( $(this).css("height") == "40px" ) {
				$(this).css("height", "auto");
			} else {
				$(this).css("height", "40px");
			}
		});

		if ($("#routeSearchContainer").children().length == 0) {
			$("#routeSearchContainer").append($("<div style = 'z-index: -1; position: absolute; height: 100%; width: 100%; text-align: center; '><h2 style = 'margin-top: 30%; '>Could not find any routes</h2></div>"));
		}
	}
}

$(document).on("page:load", aRoutesPageLoad);
$(document).ready(aRoutesPageLoad);

