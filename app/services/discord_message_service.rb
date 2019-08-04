class DiscordMessageService 
  DISCORD_API_ENDPOINT = "https://discordapp.com/api"
  DISCORD_EVENTS_CHANNEL_ID = "607374824888729611"

  def self.send_message!(channel_id, options)
    RestClient.post(  
      "#{DISCORD_API_ENDPOINT}/channels/#{channel_id}/messages", 
      options.to_json, 
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" } 
    ) 
  end

  def self.edit_message!(channel_id, message_id, options)
    RestClient.patch(  
      "#{DISCORD_API_ENDPOINT}/channels/#{channel_id}/messages/#{message_id}", 
      options.to_json, 
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" } 
    ) 
  end
end
