Rails.application.routes.draw do
  get 'events/index'

  get 'session/destroy', :as => 'logout'
  get 'session/destroy_discord', :as => 'discord_logout'

  get 'auth/google_oauth2', :as => 'google_auth'
  get 'auth/discord', :as => 'discord_auth'
  match 'auth/:provider/callback' => 'session#create', :via => [:post, :get]

   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#index"

  resources :events

  resources :registration

  get '/discord', to: 'pages#discord', :as => 'discord_path'
  get '/guide', to: 'pages#guide', :as => 'guide'
end
