require 'spec_helper'

describe Api::IncidentsController do
  it "should be able to list records" do
    walking = create(:walking)
    running = create(:running)
    cycling = create(:cycling)
    
    get :index, format: :json
    
    response.should be_success
    json_response.count.should == 3
  end
  
  it "should be able to create a new record" do
    params = attributes_for(:incident).stringify_keys
    post :create, params, format: :json
    
    response.should be_success
    json_response.should include(params)
  end
  
  it "should be able to update a record" do
    incident = create(:incident)
    params   = JSON.parse(incident.to_json).merge({'comment' => 'modified'})
    
    put :update, params, format: :json
    
    response.should be_success
    
    incident = Incident.find(incident.id)
    incident.comment.should == 'modified'
  end
  
  it "should be able to delete a record" do
    incident = create(:incident)
    
    delete :destroy, { id: incident.id }, format: :json
    
    response.should be_success
    
    Incident.where(id: incident.id).count.should == 0
  end
end