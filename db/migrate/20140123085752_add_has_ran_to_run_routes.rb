class AddHasRanToRunRoutes < ActiveRecord::Migration
  def change
    add_column :run_routes, :has_ran, :boolean
  end
end
