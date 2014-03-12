# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

first_names = ["Calvin", "Daniel", "Christian", "Aaron", "Eric", "Sarah", "Emily", "Amy", "Victoria", "Billy", "Bob", "Tyrone", "James"]
last_names = ["Li", "Sanchez", "Mata", "Shirley", "Fong", "McGee", "Putin", "McSwaggerson", "Curry", "Johnson", "Jordan", "Evans"]
locations = {"0" => "130-176 Vassar Street, Massachusetts Institute of Technology, Cambridge, MA 02139, USA", "1" => "380 Massachusetts Avenue, Cambridge, MA 02139, USA","2" => "339 Broadway, Cambridge, MA 02139, USA","3" => "1640 Cambridge Street, Cambridge, MA 02138, USA","4" => "1699 Massachusetts Avenue, Cambridge, MA 02138, USA","5" => "2050 Massachusetts Avenue, Arlington, MA 02476, USA","6" => "12 Harrison Road, Somerville, MA 02144, USA","7" => "19 Barton Street, Somerville, MA 02144, USA","8" => "2-98 Stoughton Street, Medford, MA 02155, USA","9" => "Teele court, Medford, MA 02155, USA","10" => "1-99 Barnard Road, Medford, MA 02155, USA","11" => "22-98 Sagamore Park, Medford, MA 02155, USA","12" => "71 Franklin Street, Arlington, MA 02474, USA","13" => "28-30 Allen Street, Arlington, MA 02474, USA","14" => "35-39 Exeter Street, Arlington, MA 02474, USA","15" => "2-30 Lincoln Street, Medford, MA 02155, USA","16" => "75-99 Brooks Street, Medford, MA 02155, USA","17" => "1 Ronaele Road, Medford, MA 02155, USA","18" => "57-61 Sargent Road, Winchester, MA 01890, USA","19" => "4 Felsdale Close, Winchester, MA 01890, USA","20" => "1-3 Cutting Street, Winchester, MA 01890, USA","21" => "46 Wyman Court, Winchester, MA 01890, USA","22" => "22 Rumford Street, Winchester, MA 01890, USA","23" => "1 Abbott Court, Woburn, MA 01801, USA","24" => "67-149 Fowle Street, Woburn, MA 01801, USA","25" => "3 Hilltop Circle, Woburn, MA 01801, USA","26" => "1-25 Cranston Circle, Woburn, MA 01801, USA","27" => "1-99 Allan Street, Woburn, MA 01801, USA","28" => "25 Maple Avenue, Woburn, MA 01801, USA","29" => "Main Avenue, Woburn, MA 01801, USA","30" => "80 Campbell Street, Woburn, MA 01801, USA","31" => "1 Miller Place, Woburn, MA 01801, USA"};

#Helper function for making random routes
#num is number of random keys and range is possibles values from 0 up to 'range'
def generateRandomKeys(num, range)
	if num > range
		return nil
	end

	listKeys = []
	while (listKeys.size < num) do
		key = rand(range)
		if !listKeys.include? key
			listKeys.push(key)
		end
	end

	return listKeys
end


first_names.each do |first_name|
	last_names.each do |last_name|
		email = first_name.downcase + last_name.upcase + '@swag.com'
		age = 18 + rand(10)
		password = "swag" + first_name.downcase + "swag"
		weight = 120 + rand(80)
		user = User.create(first_name: first_name, last_name: last_name, age: age, email: email, password: password, password_confirmation: password, weight: weight.to_f)

		id = user.id

		numRoutes = 1 + rand(4)
		(0..numRoutes).each do |i|
			listKeys = generateRandomKeys(2 + rand(6), 31)
			route = RunRoute.create(user_id: id, has_ran: false, name: "AwesomeRoute " + rand(10000).to_s, distance: (rand(3) + rand).to_s + " mi")
			listKeys.each do |key|
				route.add_new_loc(locations[key.to_s], 41 + rand, -72 + rand)
			end
			route.save!
		end
	end
end

userIds = generateRandomKeys(100, first_names.size * last_names.size)

(0...59).each do |i|
	((i+1)...60).each do |j|
		r = rand(7)
		if r < 5
			Friendship.create(user_id: userIds[i], friend_id: userIds[j], state: 'accepted')
			Friendship.create(user_id: userIds[j], friend_id: userIds[i], state: 'accepted')
		else
			Friendship.create(user_id: userIds[i], friend_id: userIds[j], state: 'pending')
			Friendship.create(user_id: userIds[j], friend_id: userIds[i], state: 'requested')
		end
	end
end