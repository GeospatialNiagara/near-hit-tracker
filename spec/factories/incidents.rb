FactoryGirl.define do
  factory :incident, aliases: [:walking] do
    comment     'This is a test'
    category    'collision'
    mode        'walking'
    time        'morning'
    weather     'sunny'
    latitude    43.107565
    longitude   -79.229477
  end
  
  factory :running, class: Incident do
    comment     'This is a test'
    category    'near_collision'
    mode        'running'
    time        'afternoon'
    weather     'cloudy'
    latitude    43.1554072826282
    longitude   -79.2456904391479
  end
  
  factory :cycling, class: Incident do
    comment     'This is a test'
    category    'hazard'
    mode        'cycling'
    time        'evening'
    weather     'precipitating'
    latitude    43.168638
    longitude   -79.254810 
  end
end