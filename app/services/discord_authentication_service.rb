class DiscordAuthenticationService
  DISCORD_AUTHORIZE_URL = "https://discordapp.com/api/oauth2/authorize"
  DISCORD_PROFILE_URL = "https://discordapp.com/api/users/@me"

  def initialize(user, access_token)
    @user = user,
    @access_token = access_token
  end

  def add_user_to_discord_guild!
    RestClient.put(
      "https://discordapp.com/api/guilds/#{ENV['DISCORD_GUILD_ID']}/members/#{@user.first.discord_user.discord_uid}",
      { access_token: @access_token, nick: @user.first.name }.to_json,
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" }
    )
  end

  def get_user_info
    response = RestClient.get(
      DISCORD_PROFILE_URL,
      { Authorization: "Bearer #{@access_token}" }
    )
    return JSON.parse(response.body)
  end
end
