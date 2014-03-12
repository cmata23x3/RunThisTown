class UsersController < ApplicationController
	before_filter :authenticate_user!
	
	def homepage
		@user = current_user
		@routes = @user.run_routes
	end

	def search
		@user_ids = User.search_people(params[:search])
		if @user_ids.include? (current_user.id)
			@user_ids.delete(current_user.id)
		end
	end

	def view_friend
		@friend_id = params[:friend_id]
		if (current_user.id.to_s == @friend_id || !Friendship.exists?(user_id: current_user.id.to_i, friend_id: @friend_id.to_i))
			redirect_to homepage_path
		elsif Friendship.find_by(user_id: current_user.id.to_i, friend_id: @friend_id.to_i).state != 'accepted'
			redirect_to homepage_path
		end
	end

	def show
	    sign_out :user
	    redirect_to root_path
	end

	#Helper methods 
	def resource_name
	   :user
	 end
	
	 def resource
	   @resource ||= User.new
	 end
	
	 def devise_mapping
	   @devise_mapping ||= Devise.mappings[:user]
	 end
	 
	 def edit
	 end
end
