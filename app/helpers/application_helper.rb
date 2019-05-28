module ApplicationHelper
  def markdown(text)
    options = {
      filter_html:     true,
      hard_wrap:       true,
      space_after_headers: true,
      fenced_code_blocks: true,
      with_toc_data:   true
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
    COURSE_TABLE_HEADERS = ["Course Code", "Course Name", "Fall", "Winter", "Summer", "Required"]

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
  end
end
