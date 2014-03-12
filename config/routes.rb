RunThisTown::Application.routes.draw do
    devise_for :users
    resources :users do
        post :route_id, :on => :member
    end

    root :to => "landing#home"
    match '/homepage',          to: 'users#homepage',           via: 'get'
    match '/user_search',       to: 'users#search',             via: 'get'
    match '/user_friend',       to: 'users#view_friend',         via: 'get'
    match '/routeplanner',      to: 'route_planner#new',        via: 'get'
    match '/routeplanner_post', to: 'route_planner#create',     via: [:post]
    match '/update_route',      to: 'route_planner#update',     via: [:post]
    match '/destroy_route',     to: 'route_planner#destroy',    via: [:post]
    match '/route_search',      to: 'route_planner#search',     via: 'get'


    get "friendships/new"
    post "friendships/create"
    get "friendships/destroy"
    post "friendships/destroy"
    get "friendships/update"

    # The priority is based upon order of creation: first created -> highest priority.
    # See how all your routes lay out with "rake routes".

    # You can have the root of your site routed with "root"
    # root 'welcome#index'

    # Example of regular route:
    #   get 'products/:id' => 'catalog#view'

    # Example of named route that can be invoked with purchase_url(id: product.id)
    #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

    # Example resource route (maps HTTP verbs to controller actions automatically):
    #   resources :products

    # Example resource route with options:
    #   resources :products do
    #     member do
    #       get 'short'
    #       post 'toggle'
    #     end
    #
    #     collection do
    #       get 'sold'
    #     end
    #   end

    # Example resource route with sub-resources:
    #   resources :products do
    #     resources :comments, :sales
    #     resource :seller
    #   end

    # Example resource route with more complex sub-resources:
    #   resources :products do
    #     resources :comments
    #     resources :sales do
    #       get 'recent', on: :collection
    #     end
    #   end

    # Example resource route with concerns:
    #   concern :toggleable do
    #     post 'toggle'
    #   end
    #   resources :posts, concerns: :toggleable
    #   resources :photos, concerns: :toggleable

    # Example resource route within a namespace:
    #   namespace :admin do
    #     # Directs /admin/products/* to Admin::ProductsController
    #     # (app/controllers/admin/products_controller.rb)
    #     resources :products
    #   end
end
