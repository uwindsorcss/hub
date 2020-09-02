class Hunter < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
end
