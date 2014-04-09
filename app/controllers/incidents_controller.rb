class IncidentsController < ApplicationController
  def index
  end
  
  def new
    @incident = Incident.new
  end
  
  def create
    @incident = Incident.new(safe_params)
    respond_to do |format|
      if @incident.save
        format.html { redirect_to root_path, notice: 'Added incident.' }
        format.json { render json: @incident, status: :success }
        format.js
      else
        format.html { render :new }
        format.json { render json: @incident.errors, status: :unprocessable_entity }
        format.js
      end
    end
  end
  
  private
  
  def safe_params
    params.require(:incident).permit(
      :comment, 
      :email, 
      :latitude, 
      :longitude,
      :category,
      :mode,
      :time,
      :weather
    )
  end
end