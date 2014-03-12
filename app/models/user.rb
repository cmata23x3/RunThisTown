class User < ActiveRecord::Base
	has_many :run_routes
	has_many :friendships
	has_many :accepted_friendships, :class_name => "Friendship", 
							:conditions => {:state => 'accepted'}
	has_many :requested_friendships, :class_name => "Friendship", 
							:conditions => {:state => 'requested'}
	has_many :pending_friendships, :class_name => "Friendship", 
							:conditions => {:state => 'pending'}
	
	has_many :friends, :through => :accepted_friendships
	has_many :requested_friends, :through => :requested_friendships, :source => :friend
	has_many :pending_friends, :through => :pending_friendships, :source => :friend

	has_attached_file :avatar,
						:url => "/assets/users/:id/:basename.:extension",
						:path => ":rails_root/public/assets/users/:id/:basename.:extension"

	validates_attachment_size :avatar, :less_than => 5.megabytes
	validates_attachment_content_type :avatar, :content_type => ['image/jpeg', 'image/png']

	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
	     :recoverable, :rememberable, :trackable, :validatable


	#UserNode for searching
	#value is total number of successful matches with first/last name/email
	UserNode = Struct.new(:id, :value)

	def get_name
		return "#{self.first_name} #{self.last_name}"
	end

	def self.search_people(input)
		vals = input.split
		possible_friends = []
		self.all.each do |user|
			points = 0
			for string in vals
				if string.include? "@" and string.downcase == user.email.downcase
					points += 2
				end

				if string.downcase == user.first_name.downcase
					points += 2
				elsif user.first_name.downcase.include? string.downcase
					points += 1
				end

				if string.downcase == user.last_name.downcase
					points += 2
				elsif user.last_name.downcase.include? string.downcase
					points += 1
				end
			end

			#Check if there is a match, and if so, add to array
			if points > 0
				possible_friends.push(UserNode.new(user.id, points))
			end
		end

		possible_friends.sort_by! { |node| -node.value }
		return possible_friends.map { |node| node.id }
	end
end
