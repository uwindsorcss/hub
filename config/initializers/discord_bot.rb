require 'discordrb'
require 'pry-byebug'
require 'json'
require 'fuzzystringmatch'

class Main
  ::Bot = Discordrb::Commands::CommandBot.new(
    token: ENV['DISCORD_API_TOKEN'],
    client_id: ENV['DISCORD_API_CLIENT_ID'],
    prefix: '~',
    help_command: false,
  )

  puts "This bot's invite URL is #{Bot.invite_url}."
  puts 'Click on it to invite it to your server.'

  Bot.command(:verify) do |event|
    begin
      event.message.delete
    rescue Discordrb::Errors::NoPermission
      DiscordMessageSender.send_embedded(
        event.user.pm,
        title: "Warning",
        description: ":warning: Bot has insufficient permissions to delete your command message.",
      )
    rescue RestClient::Exception
      # Receiving an error for some reason, even when it deletes correctly
    end
    if event.server.nil?
      DiscordMessageSender.send_embedded(
        event.user.pm,
        title: "Invalid Usage",
        description: ":bangbang: You must verify in a server. You cannot execute `~verify` in private messages.",
      )
      break
    end
    if DiscordVerification.where(discord_user: event.user.id, verified: true).any?
      DiscordMessageSender.send_embedded(
        event.user.pm,
        title: "Invalid Usage",
        description: ":warning: Your account is already verified!",
      )
      break
    end

    DiscordVerification.where(discord_user: event.user.id, verified: false).destroy_all
    @discord_verification = DiscordVerification.new(id: SecureRandom.uuid, discord_user: event.user.id, server: event.server.id)
    @discord_verification.save

    DiscordMessageSender.send_embedded(
      event.user.pm,
      title: "Verification Started",
      description: "Created verification link.\n\nGo to http://discord.cs.uwindsor.ca/discord/verifications/#{@discord_verification.id} and sign in with your **@uwindsor.ca** email address to verify your account.",
    )
  end

  Bot.run :async
end
