module ApplicationHelper
  def markdown(text)
    options = {
      filter_html:     true,
      hard_wrap:       true,
      space_after_headers: true,
      fenced_code_blocks: true,
      with_toc_data:   true,
      autolink: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      disable_indented_code_blocks: true,
      tables:             true

    }

    renderer = CustomRender.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end

  class CustomRender < Redcarpet::Render::HTML
    COURSE_TABLE_HEADERS = ["Course Code", "Course Name", "Fall", "Winter", "Summer", "Required", "Prerequisite(s)"]

    def table(header, body)
      "<table class=\"table table-bordered\">" \
        "#{header}#{body}" \
      "</table>"
    end

    def table_cell(content, alignment)
      if content == "Offered"
        "<td style=\"color:green\">" + content + "</td>"
      elsif content == "Not Offered"
        "<td style=\"color:red\">" + content + "</td>"
      # Had to do this hacky check because of an issue with Redcarpet that has been reported
      elsif COURSE_TABLE_HEADERS.include? content
        "<th>" + content + "</th>"
      else
        "<td>" + content + "</td>"
      end
    end

    def image(link, title, alt_text)
      "<a href=\"#{link}\"><img src=\"#{link}\" class=\"img-responsive\" alt=\"#{alt_text}\" width=\"80%\"></a>"
    end

    def autolink(link, link_type)
      case link_type
        when :url then url_link(link)
        when :email then email_link(link)
      end
    end

    def url_link(link)
      if URI.parse(link).host == "www.youtube.com"
        youtube_link(link)
      else
        normal_link(link)
      end
    end

    def youtube_link(link)
      video_id_start = link.index('v=') + 2
      video_id = link[video_id_start..video_id_start + 11]
      "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/#{video_id}\" frameborder=\"0\" allowfullscreen></iframe>"
    end

    def normal_link(link)
      "<a href=\"#{link}\">#{link}</a>"
    end

    def email_link(email)
      "<a href=\"mailto:#{email}\">#{email}</a>"
    end
  end

  def title(text)
    content_for :title, text
  end

  def meta_tag(tag, text)
    content_for :"meta_#{tag}", text
  end

  def yield_meta_tag(tag, default_text='')
    content_for?(:"meta_#{tag}") ? content_for(:"meta_#{tag}") : default_text
  end

  # Simple_discussion need this method
  def user_signed_in?
    !!current_user
  end
end
