class DiscordVerification < ApplicationRecord
  belongs_to :user, optional: true
end
