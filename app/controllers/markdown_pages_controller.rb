class MarkdownPagesController < ApplicationController
  def new
    @page = MarkdownPage.new
  end

  def create
    @page = MarkdownPage.new(page_params)
    if current_user&.is_admin?
      if @page.save
        redirect_to root_url, flash: { success: "Successfully created \"#{@page.title}\" page" }
      else
        render 'new'
      end
    else
      @page.errors.add(:title, :no_permission, message: "You do not have permission to modify pages!")
      render 'new'
    end
  end  

  def edit
    @page = MarkdownPage.find(params[:id])
  end

  def update
    @page = MarkdownPage.find(params[:id])
    if current_user&.is_admin?
      if @page.update(page_params)
        redirect_to root_url, flash: { success: "Successfully updated page "}
      else
        render 'edit'
      end
    else
      @page.errors.add(:title, :no_permission, message: "You do not have permission to modify pages!")
      render 'edit'
    end    
  end

  private

  def page_params
    params.require(:markdown_page).permit(:title, :text)
  end  
end
