require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module UWindsorCssHub
  class Application < Rails::Application
    UWINDSOR_AZURE_TENANT_ID = '12f933b3-3d61-4b19-9a4d-689021de8cc9'

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_record.default_timezone = :local
    config.active_job.queue_adapter = Rails.env.production? ? :sidekiq : :async
    config.serve_static_assets = true

    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value
      end if File.exists?(env_file)
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.middleware.use OmniAuth::Builder do
      provider :microsoft_graph,
        ENV['AZURE_CLIENT_ID'],
        ENV['AZURE_CLIENT_SECRET'],
        scope: 'user.read',
        client_options: {
          token_url:     "#{UWINDSOR_AZURE_TENANT_ID}/oauth2/v2.0/token",
          authorize_url: "#{UWINDSOR_AZURE_TENANT_ID}/oauth2/v2.0/authorize"
        }
    end
  end
end
