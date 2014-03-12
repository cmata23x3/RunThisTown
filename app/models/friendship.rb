class Friendship < ActiveRecord::Base
	belongs_to :user
	belongs_to :friend, :class_name => 'User'

	def self.accept_one_side(user_id, friend_id)
		friendship = find_by_user_id_and_friend_id(user_id, friend_id)
		friendship.state = "accepted"
		friendship.save!
	end
end
