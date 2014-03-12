class LandingController < ApplicationController
	before_filter :logged_in

	def home
	end

	private
	#redirects user if they are logged in
	def logged_in
	  if current_user != nil
	    redirect_to homepage_path
	  end
	end
end
