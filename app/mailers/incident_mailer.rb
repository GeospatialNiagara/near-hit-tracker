class IncidentMailer < ActionMailer::Base
  default from: 'notifications@carlinreport.com'
  
  def new_incident(incident, contact)
    @contact  = contact
    @incident = incident
    mail(to: contact[:email], subject: 'New incident reported on Carlin Report')
  end
end