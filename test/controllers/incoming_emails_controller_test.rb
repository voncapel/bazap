require "test_helper"

class IncomingEmailsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get incoming_emails_show_url
    assert_response :success
  end
end
