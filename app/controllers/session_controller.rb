class SessionController < ApplicationController
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
        if current_user.discord_user.nil? || !current_user.discord_user.verified? || current_user.discord_user == discord_user
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
end
