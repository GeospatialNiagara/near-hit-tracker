class Incident < ActiveRecord::Base
  reverse_geocoded_by :latitude, :longitude

  enum category: [:unverified_category, :collision, :near_collision, :hazard]
  enum mode:     [:unverified_mode, :walking, :running, :cycling]
  enum time:     [:unverified_time, :morning, :afternoon, :evening, :night]
  enum weather:  [:unverified_weather, :sunny, :cloudy, :precipitating]

  validates :email, format: { with: /.+@.+\..+/, message: "%{value} is not valid" }
  validates :latitude, presence: true
  validates :longitude, presence: true
end
