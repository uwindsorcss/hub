require 'test_helper'

class MarkdownPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get edit" do
    get markdown_pages_edit_url
    assert_response :success
  end

  test "should get update" do
    get markdown_pages_update_url
    assert_response :success
  end

end
