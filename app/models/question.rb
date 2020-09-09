class Question < ApplicationRecord
  has_many :answers
  has_many :users, through: :answers

  validates :question_number, presence: true
end
