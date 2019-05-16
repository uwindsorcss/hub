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
    "macprogram@uwindsor.ca"
  ]

  def create
    provider = auth_hash[:provider]
    if provider == "google_oauth2"
      user = User.find_or_create_by(:email => auth_hash[:info][:email]) do |user|
        user.email = auth_hash[:info][:email]
        user.name = auth_hash[:info][:name]
      end

      session[:user_id] = user.id
      redirect_to request.env["omniauth.origin"]
    elsif provider == "discord"
      discord_user = DiscordUser.find_or_create_by(discord_uid: auth_hash[:uid])
      if current_user
        if BLACKLISTED_EMAILS.include? current_user.email
          redirect_to :discord_path, flash: { error: "Staff/faculty are not permitted to join the Discord server" }
        elsif user_has_not_verified_other_discord_users?(current_user, discord_user)
          discord_user.update(verified: true)
          current_user.update(discord_user: discord_user)
          session[:discord_user_id] = discord_user.id
          add_user_to_discord_guild(current_user, current_user.discord_user, auth_hash[:credentials][:token])
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

  private

  def auth_hash
    request.env["omniauth.auth"]
  end

  def add_user_to_discord_guild(user, discord_user, access_token)
    RestClient.put(
      "https://discordapp.com/api/guilds/#{ENV['DISCORD_GUILD_ID']}/members/#{discord_user.discord_uid}",
      { access_token: access_token, nick: user.name }.to_json,
      { content_type: :json, Authorization: "Bot #{ENV['DISCORD_BOT_TOKEN']}" }
    )
  end

  # Returns true in three cases:
  # 1) User has no linked DiscordUser
  # 2) User has a linked DiscordUser but it is not verified
  # 3) User has a linked DiscordUser that is verified and equivalent to the one being signed-in (verifying the same
  # account again, makes sense if the user left the server and needs to be added back in)
  def user_has_not_verified_other_discord_users?(user, discord_user)
    user.discord_user.nil? || !user.discord_user.verified? || user.discord_user == discord_user
  end
end
