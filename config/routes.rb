Rails.application.routes.draw do
  root to: 'incidents#index'

  namespace :api do
    resources :incidents, except: [:new, :edit]
  end
end
