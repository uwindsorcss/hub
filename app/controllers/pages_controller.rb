class PagesController < ApplicationController
  def discord
    @page_title = "Discord"
    @page = MarkdownPage.find_by(title: @page_title)
  end

  def guide
    @page_title = "Student Guide"
    @page = MarkdownPage.find_by(title: @page_title)
  end

  def index
    @page_title = "Home"
    @page = MarkdownPage.find_by(title: @page_title)
  end

  def about
    @page_title = "About"
    @page = MarkdownPage.find_by(title: @page_title)
  end
end
