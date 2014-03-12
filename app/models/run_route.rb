class RunRoute < ActiveRecord::Base
	serialize :locations,Array

	belongs_to :user

	#The data structure that represents a location in the array of locations in route
	#Location Info = {name, {latitude, longitude}}
	LocCoord = Struct.new(:latitude, :longitude)
	LocInfo = Struct.new(:name, :coord)

	#Data structure for putting into heap when performing search
	LocNode = Struct.new(:id, :shortest_dist)

	#Max number of relevant routes when doing search
	NUM_ROUTES = 50

	def add_new_loc(name, latitude, longitude)
		self.locations.push(LocInfo.new(name, LocCoord.new(latitude, longitude)))
		return true
	end

	#Searching methods
	require 'bigdecimal'

	#private, helper function
	#Takes in lat and long, returns value of shortest distance from one of the waypoints
	def shortest_distance_from(latitude, longitude)
		min_dist = BigDecimal.new("10.0")
		input_lat = BigDecimal.new(latitude)
		input_lng = BigDecimal.new(longitude)

		#Find waypoint with shortest distance from input
		for location in self.locations
			point_lat = BigDecimal(location.coord.latitude.to_s)
			point_lng = BigDecimal(location.coord.longitude.to_s)

			#Get distance between two points
			dist = ((input_lat - point_lat)**2 + (input_lng - point_lng)**2).sqrt(10)

			#Update the minimum
			if min_dist > dist
				min_dist = dist
			end
		end

		return min_dist
	end


	def self.max_heapify(max_heap, i)
		left = 2*i + 1
		right = 2*i + 2
		largest = i
		if (left < max_heap.size and max_heap[left].shortest_dist > max_heap[largest].shortest_dist)
			largest = left
		end
		if (right < max_heap.size and max_heap[right].shortest_dist > max_heap[largest].shortest_dist)
			largest = right
		end
		if (largest != i)
			#Do swapping
			temp = max_heap[largest]
			max_heap[largest] = max_heap[i]
			max_heap[i] = temp

			#continue the fixing of heap!
			max_heapify(max_heap, largest)
		end
	end

	#Removes out max value, fixes heap
	def self.fix_heap(max_heap, node)
		#replace last element with first
		max_heap[0] = max_heap[-1]
		max_heap.pop

		#fix heap
		max_heapify(max_heap, 0)

		#insert node to end
		max_heap.push(node)

		#fix heap
		index = max_heap.size - 1
		parent = (index - 1)/2
		while (parent > 0 and max_heap[index].shortest_dist > max_heap[parent].shortest_dist) do
			#Do the swapping
			temp = max_heap[index]
			max_heap[index] = max_heap[parent]
			max_heap[parent] = temp

			#Fix the indexing
			index = parent
			parent = (index - 1)/2
		end
	end

	def self.search_closest_routes(latitude, longitude)
		#Heap to hold the most relevant routes
		max_heap = (1..NUM_ROUTES).collect { LocNode.new(-1, BigDecimal("0.70")) }

		#Find 50 top best routes by updating max_heap
		self.all.each do |route|
			dist = route.shortest_distance_from(latitude, longitude)
			p dist.to_f

			#Only heapify if root.value > node.value 
			if (max_heap[0].shortest_dist > dist)
				node = LocNode.new(route.id, dist)
				fix_heap(max_heap, node)
			end
		end

		#Sort max_heap array
		max_heap.sort_by! { |node| node.shortest_dist }
		max_heap.select! { |node| node.id != -1 }
		return max_heap.map { |node| node.id }
	end
end
