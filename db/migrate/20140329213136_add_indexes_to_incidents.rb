class AddIndexesToIncidents < ActiveRecord::Migration
  def change
    add_index :incidents, :latitude
    add_index :incidents, :longitude
  end
end
