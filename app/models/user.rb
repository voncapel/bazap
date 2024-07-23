class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]+\z/, message: "only allows letters, numbers, and underscores" }
  validates :password, presence: true, length: { minimum: 6 }
  has_many :incoming_emails
  
  def email
    "#{username}@bazap.news"
  end
  
  def self.find_by_email(email)
    where("username = ?", email.split('@').first).first
  end

end
