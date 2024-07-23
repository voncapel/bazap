class MigrateEmailsToIncomingEmails < ActiveRecord::Migration[7.0]
  def up
    if table_exists?(:emails)
      # Get the common columns between emails and incoming_emails
      email_columns = ActiveRecord::Base.connection.columns("emails").map(&:name)
      incoming_email_columns = ActiveRecord::Base.connection.columns("incoming_emails").map(&:name)
      common_columns = email_columns & incoming_email_columns
      
      # Remove 'id' from common columns as it will be auto-generated
      common_columns -= ['id']
      
      # Create the INSERT statement dynamically
      columns_string = common_columns.join(', ')
      
      execute <<-SQL
        INSERT INTO incoming_emails (#{columns_string})
        SELECT #{columns_string}
        FROM emails
      SQL
      
      # Optionally, drop the old emails table
      # Uncomment the next line if you're sure you want to drop the old table
      # drop_table :emails
    else
      puts "The emails table doesn't exist. Skipping data migration."
    end
  end

  def down
    # If you need to roll back, you could potentially move data back to emails table
    # But since we're renaming for a reason, it's usually fine to leave this empty
  end
end