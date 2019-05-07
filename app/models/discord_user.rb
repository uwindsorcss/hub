class DiscordUser < ApplicationRecord
  belongs_to :user, optional: true
end
