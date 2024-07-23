class InboxMailbox < ApplicationMailbox
  def process
    user = User.find_by(email: mail.to.first)
    
    if user
      user.incoming_emails.create!(
        subject: mail.subject,
        body: mail.body.to_s,
        sender: mail.from.first,
        received_at: Time.now
      )
      Rails.logger.info "Email processed for user: #{user.email}"
    else
      Rails.logger.warn "Received email for non-existent user: #{mail.to.first}"
    end
  end
end