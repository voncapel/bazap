class IncomingEmail < ApplicationRecord
  belongs_to :user

  attribute :read, :boolean, default: false
  
  def sender_name
    sender.split('@').first.titleize
  end
end
