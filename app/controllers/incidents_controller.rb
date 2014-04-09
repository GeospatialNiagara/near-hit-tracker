class IncidentsController < ApplicationController
  def index
  end
  
  def new
    @incident = Incident.new
  end
end
