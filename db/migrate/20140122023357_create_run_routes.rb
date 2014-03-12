class CreateRunRoutes < ActiveRecord::Migration
  def change
    create_table :run_routes do |t|
    	t.integer :user_id	
      t.string :name
      t.text :locations

      t.timestamps
    end
  end
end
