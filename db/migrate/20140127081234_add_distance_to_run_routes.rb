class AddDistanceToRunRoutes < ActiveRecord::Migration
  def change
    add_column :run_routes, :distance, :string
  end
end
