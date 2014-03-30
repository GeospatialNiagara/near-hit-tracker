class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.text :comment
      t.string :email
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.integer :category, default: 0, null: false
      t.integer :mode, default: 0, null: false
      t.integer :time, default: 0, null: false
      t.integer :weather, default: 0, null: false

      t.timestamps
    end
  end
end
