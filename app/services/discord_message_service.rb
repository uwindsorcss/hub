class DiscordMessageService 
  DISCORD_API_ENDPOINT = "https://discordapp.com/api"
  DISCORD_EVENTS_CHANNEL_ID = "489122007506616321"

  def self.send_message!(channel_id, options)
    options.deep_merge!(default_options)
    RestClient.post(
      "#{DISCORD_API_ENDPOINT}/channels/#{channel_id}/messages",
      options.to_json,
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" }
    )
  end

  def self.edit_message!(channel_id, message_id, options)
    options.deep_merge!(default_options)
    RestClient.patch(  
      "#{DISCORD_API_ENDPOINT}/channels/#{channel_id}/messages/#{message_id}", 
      options.to_json, 
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" } 
    ) 
  end

  def self.delete_message!(channel_id, message_id)
    RestClient.delete(
      "#{DISCORD_API_ENDPOINT}/channels/#{channel_id}/messages/#{message_id}",
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" }
    )
  rescue RestClient::ExceptionWithResponse
  end

  private

  def self.default_options
    {
      embed: {
        thumbnail: { url: "https://css.uwindsor.ca/uwindsor_logo.png" }
      }
    }
  end
end
