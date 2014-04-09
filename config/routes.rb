Rails.application.routes.draw do
  root to: 'incidents#index'

  resources :incidents, only: [:new]
  
  namespace :api do
    resources :incidents, except: [:new, :edit]
  end
end
