Rails.application.routes.draw do
  root 'home#index'
  get 'signup', to: 'users#new'
  post 'users', to: 'users#create'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  resources :incoming_emails, only: [:show]
  get 'inbox', to: 'inbox#index'
  get 'inbox/:id', to: 'inbox#show', as: 'email'
  mount ActionMailbox::Engine => "/rails/action_mailbox"
end