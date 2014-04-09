Rails.application.routes.draw do
  root to: 'incidents#index'

  resources :incidents, only: [:new, :create]
  
  namespace :api do
    resources :incidents, except: [:new, :edit]
  end
end
