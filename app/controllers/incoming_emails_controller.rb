class IncomingEmailsController < ApplicationController
  def show
    @email = current_user.incoming_emails.find(params[:id])
  end
end