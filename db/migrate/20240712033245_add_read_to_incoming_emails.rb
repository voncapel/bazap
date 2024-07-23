class AddReadToIncomingEmails < ActiveRecord::Migration[7.1]
  def change
    add_column :incoming_emails, :read, :boolean
  end
end
