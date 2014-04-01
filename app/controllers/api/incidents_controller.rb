class Api::IncidentsController < Api::ApiController
  before_action :set_incident, only: [:show, :update, :destroy]
  respond_to    :json

  # GET /api/incidents
  def index
    @incidents = Incident.near([43.107854, -79.183083], 30, units: :km)

    render json: @incidents
  end

  # GET /api/incidents/:id
  def show
    render json: @incident
  end

  # POST /api/incidents
  def create    
    @incident = Incident.new(safe_params)
    if @incident.save
      render json: @incident, status: :created, location: [:api, @incident]
    else
      render json: @incident.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/incidents/:id
  def update
    if @incident.update(safe_params)
      render nothing: true, status: :ok, location: [:api, @incident]
    else
      render json: @incident.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/incidents/:id
  def destroy
    @incident.destroy
    head :no_content
  end

  private

  def set_incident
    @incident = Incident.find(params[:id])
  end

  def safe_params
    params.permit(
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
