if (Meteor.isClient) {

    Template.kewlTemplate.helpers({
        isOwner: function(){
            return this.owner === Meteor.userId();
        }   
    });
    
    
    
    Template.kewlTemplate.events({
       
       'click .toggle-checked': function(){
          Meteor.call("updateResolution", this._id, !this.checked);    //calls updateResolution method (in meteorproject.js) with the opposite of the current checked value(True/Fale) as a param
       },
       
       
       //delete
       'click .delete': function(){
           Meteor.call("deleteResolution", this._id);  //calls deleteResollution method (in meteorproject.js) with the users id as a param. 
       }, 
       
       'click .toggle-private': function(){
           Meteor.call("setPrivate", this._id, !this.private);  //calls setPrivate method (in meteorproject.js) with the users id and the opposite of the users private value(True/False) as a param.
       }        
        
    });
    
    
}

