class SendDiscordMessageJob < ApplicationJob
  DISCORD_API_ENDPOINT = "https://discordapp.com/api"

  def perform(channel_id, content, options = {})
    options.merge!(content: content)
    RestClient.post(
      "#{DISCORD_API_ENDPOINT}/channels/#{channel_id}/messages",
      options.to_json,
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" }
    )
  end
end
