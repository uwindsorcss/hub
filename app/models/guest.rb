class Guest < ApplicationRecord
  has_one :user, through: :registrations
end
