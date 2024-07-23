class InboxController < ApplicationController
  before_action :require_login

  def index
    @senders = current_user.incoming_emails.group_by(&:sender).transform_values do |emails|
      {
        name: emails.first.sender_name,
        unread_count: emails.count { |e| !e.read },
        emails: emails.sort_by(&:created_at).reverse.take(5)
      }
    end
    
    @selected_email = params[:email_id] ? current_user.incoming_emails.find(params[:email_id]) : @senders.values.first&.dig(:emails, 0)
  end

  def show
    @email = current_user.incoming_emails.find(params[:id])
    @email.update(read: true)
    
    render json: { body: @email.body, subject: @email.subject }
  end

  def require_login
    unless current_user
      redirect_to login_path, alert: "You must be logged in to access this page"
    end
  end
end