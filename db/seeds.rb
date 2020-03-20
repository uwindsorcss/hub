# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Upcoming events
10.times do |n|
    Event.create!(title:  "test#{n}",
                 description: "This is description #{n}", 
                 location: "location: #{n}",
                 capacity: "12",
                 registration_enabled: true,
                 start_date: Time.zone.now, 
                 end_date: 2.days.from_now)
  end

# Past event
13.times do |n|
  Event.create!(title:  "Test#{n}",
                description: "This is description #{n}", 
                location: "location: #{n}",
                capacity: "12",
                registration_enabled: true,
                start_date: Time.zone.now - 5.days, 
                end_date: Time.zone.now - 2.days)
end


# User Create
10.times do |n|
  User.create!(email: "#{n+2}@uwindsor.ca",
                name: "User #{n+1}",
                role: "guest")
end

# Let random user register existing event
1.times do |n|
  Registration.create!(user_id: n+2,
                      event_id: 1,
                      waitlisted: false)
end
