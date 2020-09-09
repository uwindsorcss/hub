class AddDataToQuestions < ActiveRecord::Migration[5.2]
  def up
    (1..12).each do |i|
      Question.create(question_number: i)
    end
  end

  def down
    (1..12).each do |i|
      Question.find_by(question_number: i)&.destroy()
    end
  end
end
