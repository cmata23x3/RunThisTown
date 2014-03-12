class FriendshipsController < ApplicationController
	def new
	end

	def create
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		p current_user.id
		p @user_id
		unless (@user_id == @friend_id || Friendship.exists?(user_id: @user_id.to_i, friend_id: @friend_id.to_i) || current_user.id.to_s != @user_id)
			Friendship.create(user_id: @user_id, friend_id: @friend_id, state: "requested")
			Friendship.create(user_id: @friend_id, friend_id: @user_id, state: "pending")
			puts "did this"
		end

		# TODO: Do error messages if friends don't get added
		redirect_to homepage_path
	end

	def update
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		unless (@user_id == @friend_id || current_user.id.to_s != @user_id)
			Friendship.accept_one_side(@user_id, @friend_id)
			Friendship.accept_one_side(@friend_id, @user_id)
		end

		redirect_to homepage_path
	end

	def destroy
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		unless (@user_id == @friend_id || current_user.id.to_s != @user_id)
			Friendship.find_by_user_id_and_friend_id(@user_id, @friend_id).destroy
			Friendship.find_by_user_id_and_friend_id(@friend_id, @user_id).destroy
		end

		redirect_to homepage_path
	end
end
