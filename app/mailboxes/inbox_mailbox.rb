class InboxMailbox < ApplicationMailbox
  def process
    Rails.logger.info "Processing email: #{mail.subject}"
    user = User.find_by_email(mail.to.first)
    if user.present?
      Rails.logger.info "User found: #{user.username}"
      email = user.incoming_emails.create!(
        subject: mail.subject,
        body: mail.body.to_s,
        sender: mail.from.first,
        received_at: Time.now
      )
      Rails.logger.info "Email created: #{email.id}"
    else
      Rails.logger.warn "Received email for non-existent user: #{mail.to.first}"
    end
  rescue => e
    Rails.logger.error "Error processing email: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
  end
end