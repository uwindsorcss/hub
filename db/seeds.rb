# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Generate upcoming events
10.times do |n|
  start_date = Faker::Time.between(from: 3.days.from_now, to: 2.months.from_now)
  Event.create!(
    title: "#{Faker::Verb.ing_form.capitalize} at #{Faker::Company.name}",
    description: Faker::Lorem.sentence(word_count: rand(10..100)),
    location: Faker::Address.full_address,
    capacity: rand(10..50),
    registration_enabled: [true, false].sample,
    start_date: start_date,
    end_date: start_date + rand(1..24).hours
  )
end

# Generate past events
13.times do |n|
  start_date = Faker::Time.between(from: 1.days.ago, to: 2.months.ago)
  Event.create!(
    title: "#{Faker::Verb.ing_form.capitalize} at #{Faker::Company.name}",
    description: Faker::Lorem.sentence(word_count: rand(10..100)),
    location: Faker::Address.full_address,
    capacity: rand(10..50),
    registration_enabled: true ,
    start_date: start_date,
    end_date: start_date + rand(1..24).hours
  )
end


# Generate users
50.times do |n|
  name = Faker::Name.name
  User.create!(
    email: Faker::Internet.email(name: name, domain: "uwindsor.ca"),
    name: name,
    role: "guest"
  )
end

# Random number of registrations for events with enabled registration
Event.where(registration_enabled: true).each do |event|
  User.pluck.sample(rand(1..30)).each do |user|
    user = User.find(user.first)
    Registration.create!(
      user_id: user.id,
      event_id: event.id,
      waitlisted: (event.reload.spots_remaining == 0) ? true : false
    )
  end
end
