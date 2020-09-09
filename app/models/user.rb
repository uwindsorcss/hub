class User < ApplicationRecord
  has_many :registrations
  has_many :events, through: :registrations
  has_one :discord_user, dependent: :destroy
  has_many :sparkles_sent, class_name: "Sparkle", foreign_key: "sender_id"
  has_many :sparkles_received, class_name: "Sparkle", foreign_key: "receiver_id"
  has_many :answers
  has_many :questions, through: :answers

  def is_admin?
    self.role == "admin"
  end
end
