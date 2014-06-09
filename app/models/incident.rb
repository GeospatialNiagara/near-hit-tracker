class Incident < ActiveRecord::Base
  reverse_geocoded_by :latitude, :longitude

  after_create :notify

  enum category: [:unverified_category, :collision, :near_collision, :hazard]
  enum mode:     [:unverified_mode, :walking, :running, :cycling]
  enum time:     [:unverified_time, :morning, :afternoon, :evening, :night]
  enum weather:  [:unverified_weather, :sunny, :cloudy, :precipitating]

  validates :email, format: { with: /.+@.+\..+/, message: "%{value} is not valid" }, allow_blank: true
  validates :latitude, presence: true
  validates :longitude, presence: true

  protected
  
  def notify
    [
      {name: 'Nick', email: 'nkenyeres@gmail.com'},
      {name: 'Darren', email: 'darren.platakis@gmail.com'}
    ].each do |contact|
      IncidentMailer.new_incident(self, contact).deliver
    end
  end
end