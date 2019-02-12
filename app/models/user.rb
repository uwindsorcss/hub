class User < ApplicationRecord
  def is_admin?
    $ADMINS.include? self.email
  end
end
