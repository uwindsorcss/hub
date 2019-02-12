class Registration < ApplicationRecord
  has_many :guests
  belongs_to :user
  belongs_to :event
end
