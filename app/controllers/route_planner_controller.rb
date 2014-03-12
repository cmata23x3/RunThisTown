class RoutePlannerController < ApplicationController
	def new
	end

	def create
		respond_to do |format|
			#Build new Route
			@route = RunRoute.new

			locDic = params
			@route.user_id = current_user.id
			@route.name = locDic["name"]
			@route.has_ran = false
			@route.distance = locDic["distance"]
			
			#Add in locations into the route
			(0..(locDic["locations"].size - 1)).each do |i|
				locInfo = locDic["locations"][i.to_s]
				p locInfo
				@route.add_new_loc(locInfo[0], locInfo[1], locInfo[2])
			end

			#Save and redirect page
			@route.save
			format.html { redirect_to homepage_path }
			format.json { render json: { :redirect => homepage_url } } 
		end
	end

	def search
		@route_ids = RunRoute.search_closest_routes(params[:latitude], params[:longitude])
	end

	def update
		@route = RunRoute.find(params[:route_id])
		@route.has_ran = params[:has_ran]
		respond_to do |format|
			if @route.save!
				format.json { render json: {success: true} }
			else
				format.json { render json: {success: false} }
			end
		end

	end

	def destroy
		@route = RunRoute.find(params[:route_id])
		@route.destroy
		respond_to do |format|
			format.json { render json: {success: true} }
		end
	end
end
