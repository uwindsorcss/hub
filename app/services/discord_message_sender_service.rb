class DiscordMessageSenderService
  DISCORD_API_ENDPOINT = "https://discordapp.com/api"

  def initialize(channel_id, content, options = {})
    @channel_id = channel_id
    @content = content
    @options = options
  end

  def send_message!
    options.merge!(content: @content)
    RestClient.post(
      "#{DISCORD_API_ENDPOINT}/channels/#{@channel_id}/messages",
      @options.to_json,
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" }
    )
  end
end
