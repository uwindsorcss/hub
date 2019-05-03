class Guest < ApplicationRecord
  has_one :registration
  has_one :user, through: :registration
end
