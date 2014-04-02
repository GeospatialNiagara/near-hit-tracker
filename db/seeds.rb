require 'csv'

records = "#{Rails.root}/data/incidents.csv"

CSV.foreach(records) do |record|
  incident = Incident.find_or_create_by!(
    category: record[0],
    mode: record[1],
    weather: record[2],
    time: record[3],
    latitude: record[4],
    longitude: record[5]
  )
  
  puts "Recorded incident at #{incident.latitude}, #{incident.longitude}"
end