class SessionController < ApplicationController
  BLACKLISTED_EMAILS = Set[
    "imran@uwindsor.ca",
    "boufama@uwindsor.ca",
    "xjchen@uwindsor.ca",
    "cezeife@uwindsor.ca",
    "sgoodwin@uwindsor.ca",
    "rgras@uwindsor.ca",
    "arunita@uwindsor.ca",
    "rkent@uwindsor.ca",
    "kobti@uwindsor.ca",
    "jlu@uwindsor.ca",
    "pooya@uwindsor.ca",
    "asishm@uwindsor.ca",
    "angom@uwindsor.ca",
    "lrueda@uwindsor.ca",
    "shsaad@uwindsor.ca",
    "ssamet@uwindsor.ca",
    "peter@uwindsor.ca",
    "danwu@uwindsor.ca",
    "xyuan@uwindsor.ca",
    "stephano@uwindsor.ca",
    "ouda@uwindsor.ca",
    "nabil@uwindsor.ca",
    "alkhate@uwindsor.ca",
    "almamo@uwindsor.ca",
    "sanjay@uwindsor.ca",
    "rferrara@uwindsor.ca",
    "dmayo@uwindsor.ca",
    "maleki@uwindsor.ca",
    "mavrinac@uwindsor.ca",
    "philip.olla@uwindsor.ca",
    "scotto@uwindsor.ca",
    "kverner@uwindsor.ca",
    "maunzer@uwindsor.ca",
    "csgradinfo@uwindsor.ca",
    "garabon@uwindsor.ca",
    "gloria@uwindsor.ca",
    "walid@uwindsor.ca",
    "tpalmer@uwindsor.ca",
    "macprogram@uwindsor.ca",
    "selva111@uwindsor.ca"
  ]

  def create
    provider = params[:provider]
    if provider == "google_oauth2"
      user = User.find_or_create_by(:email => auth_hash[:info][:email]) do |user|
        user.email = auth_hash[:info][:email]
        user.name = auth_hash[:info][:name]
      end

      session[:user_id] = user.id
      redirect_to request.env["omniauth.origin"]
    elsif provider == "discord"
      access_token = exchange_code_for_token!
      discord_authentication_service = DiscordAuthenticationService.new(current_user, access_token)
      user_info = discord_authentication_service.get_user_info
      discord_user = DiscordUser.find_or_create_by(discord_uid: user_info["id"])
      if current_user
        if BLACKLISTED_EMAILS.include? current_user.email
          redirect_to :discord_path, flash: { error: "Staff/faculty are not permitted to join the Discord server" }
        elsif user_has_not_verified_other_discord_users?(current_user, discord_user)
          discord_user.update(verified: true)
          current_user.update(discord_user: discord_user)
          session[:discord_user_id] = discord_user.id
          discord_authentication_service.add_user_to_discord_guild!
          send_verified_message_to_discord_user(discord_user)
          redirect_to :discord_path, flash: { success: "You've successfully linked your Discord account and have been added to the UWindsor CSS Discord server!" }
        else
          redirect_to :discord_path, flash: { error: "You've already linked another Discord account to this email!" }
        end
      else
        redirect_to :discord_path, flash: { error: "Authorize/sign-in with UWindsor before signing into Discord" }
      end
    end
  end

  def destroy
    reset_session

    redirect_to request.referrer
  end

  def destroy_discord
    session[:discord_user_id] = nil

    redirect_to request.referrer
  end

  def discord_auth
    authorization_url = generate_url(
      "https://discordapp.com/api/oauth2/authorize",
      {
        client_id: ENV['DISCORD_CLIENT_ID'],
        scope: "guilds.join identify",
        redirect_uri: "#{ENV['HOST']}/auth/discord/callback",
        response_type: "code"
      }
    )
    redirect_to(authorization_url)
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end

  def generate_url(url, params = {})
    uri = URI(url)
    uri.query = params.to_query
    uri.to_s
  end

  def exchange_code_for_token!
    response = RestClient.post(
      "https://discordapp.com/api/oauth2/token",
      {
        client_id: ENV['DISCORD_CLIENT_ID'],
        client_secret: ENV['DISCORD_CLIENT_SECRET'],
        scope: "guilds.join identify",
        code: params[:code],
        redirect_uri: "#{ENV['HOST']}/auth/discord/callback",
        grant_type: "authorization_code"
      }
    )
    formatted_response = JSON.parse(response.body)
    return formatted_response["access_token"]
  end

  # Returns true in three cases:
  # 1) User has no linked DiscordUser
  # 2) User has a linked DiscordUser but it is not verified
  # 3) User has a linked DiscordUser that is verified and equivalent to the one being signed-in (verifying the same
  # account again, makes sense if the user left the server and needs to be added back in)
  def user_has_not_verified_other_discord_users?(user, discord_user)
    user.discord_user.nil? || !user.discord_user.verified? || user.discord_user == discord_user
  end

  def send_verified_message_to_discord_user(discord_user)
    message = {
      embed: {
        title: "You're in! :white_check_mark:",
        description: "Welcome to the **University of Windsor CS Discord**! You've come to a great place.\n\n"\
          "Make sure you add your year to your profile by sending `~year <1-4, masters, alumni>` (e.g. `~year 1`).\n\n"\
          "We've set your nickname to **#{discord_user.user.name}**. Please contact a CSS member if you'd like to shorten your name (e.g. Johnathon Middlename Doe -> John Doe).\n\n"\
          "You can mute individual channels to prevent yourself from being spammed. We recommend you mute any course channels that you are not taking and leave the rest unmuted to make sure you're not missing out on important content. You can find the mute button by right-clicking on a channel.\n\n"\
          "We also have a few more useful commands built into the bot. You can see the commands by typing `~help`."
      }
    }
    DiscordMessageService.send_message_to_dm!(discord_user.discord_uid, message)
  end
end
