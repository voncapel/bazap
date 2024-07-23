class CreateIncomingEmails < ActiveRecord::Migration[7.1]
  def change
    create_table :incoming_emails do |t|
      t.references :user, null: false, foreign_key: true
      t.string :subject
      t.text :body
      t.string :sender
      t.datetime :received_at

      t.timestamps
    end
  end
end
