Rails.application.routes.draw do
  get 'events/index'

  get 'session/destroy', :as => 'logout'
  get 'session/destroy_discord', :as => 'discord_logout'

  get 'auth/microsoft_graph', :as => 'office365_auth'
  get 'auth/discord', :to => 'session#discord_auth', :as => "discord_auth"
  match 'auth/:provider/callback' => 'session#create', :via => [:post, :get]

   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#index"

  resources :events

  resources :markdown_pages, only: [:edit, :update, :new, :create]

  resources :registration

  get '/discord', to: 'pages#discord', :as => 'discord_path'
  get '/guide', to: 'pages#guide', :as => 'guide'
  get '/about', to: 'pages#about', :as => 'about'
  get '/spikeball', to: redirect('/events/17')
  get '/store', to: redirect('https://store.uwindsorcss.ca/')
end
