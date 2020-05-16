class PostsController < ApplicationController
  before_action :has_admin_role, only: [:new, :create, :edit, :update]

  def index
    @posts = Post.order(created_at: :desc).page(params[:page])
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to posts_path, flash: { success: "Successfully created a new post" }
    else
      flash[:error] = "#{@post.errors.size} errors prohibited this page from being saved:\n#{@post.errors.full_messages}"
      redirect_to new_post_path
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to posts_path, flash: { success: "Successfully updated"}
    else
      flash[:error] = "#{@post.errors.size} errors prohibited this page from being saved:\n#{@post.errors.full_messages}"
      redirect_to edit_post_path(@post)
    end
  end

  private
    def post_params
      params.require(:post).permit(:title, :content)
    end

    def has_admin_role
      unless current_user&.is_admin?
        flash[:error] = "You don't have permission to access this page"
        redirect_to posts_path
      end
    end
end