class DiscordVerificationsController < ApplicationController
  def new
  end

  def show
    # Need to catch error where discord_verification is not found. Same with other "finds" (old codes are deleted when new one is created for same user, for example)
    @discord_verification = DiscordVerification.find(params[:id])
    @status = "Unverified"
    if current_user
      if uwindsor_email(current_user) and email_not_used(current_user.email, @discord_verification.discord_user)
        @discord_verification.update(verified: true)
        @discord_verification.save
        @status = "Verified"
        current_user.update(discord_verification: @discord_verification)

        server = ::Bot.servers[@discord_verification.server]
        member = server.members.find { |member| member.id == @discord_verification.discord_user }

        DiscordMessageSender.send_embedded(
          member.pm,
          title: "Success",
          description: "You've been verified! :white_check_mark:\n\nYour nickname will be changed to **#{current_user.name}**, taken from you uWindsor account. Nicknames should be your first + last name - please message a CSS member/exec if you would like to shorten it.\n\nYou can add your study status to your profile using the `~year <1-4, masters, alumni>` command.\n\nEnjoy the server!",
        )

        eric_member = server.members.find { |member| member.id == 250814060419874816 }
        eric_member.pm("#{current_user.name} has been verified!") if eric_member

        begin
          server = ::Bot.servers[@discord_verification.server]
          member.add_role(server.roles.find { |role| role.name.upcase == "VERIFIED"} )
          member.nickname = current_user.name
        rescue Discordrb::Errors::NoPermission
          DiscordMessageSender.send_embedded(
            member.pm,
            title: "Warning",
            description: ":warning: Bot has insufficient permissions to change your role and/or nickname.",
          )
        end
      end
    else
      @status = "Verified" if discord_user_verified(@discord_verification.discord_user)
    end
  rescue ActiveRecord::RecordNotFound
    @status = "Invalid"
  end

  private

  def uwindsor_email(user)
    return true if user.hd == "uwindsor.ca"
    @status = "Please use your @uwindsor.ca email address to verify your account."
    false
  end

  def discord_user_verified(discord_user_id)
    return true if DiscordVerification.where(discord_user: discord_user_id, verified: true).any?
    false
  end

  def email_not_used(email, discord_user_id)
    existing_verification = DiscordVerification.joins(:user).where(users: { email: current_user.email }, verified: true).first
    return true if existing_verification.nil?

    if existing_verification.discord_user == discord_user_id
      @status = "Verified"
    else
      @status = "The email #{current_user.email} has already been used to verify a discord account."
    end
    false
  end
end
