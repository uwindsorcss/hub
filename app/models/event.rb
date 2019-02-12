class Event < ApplicationRecord
  validates :title, :description, presence: true, length: { minimum: 3 }
end
