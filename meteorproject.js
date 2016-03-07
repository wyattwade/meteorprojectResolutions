


var Resolutions = new Mongo.Collection('resolutions');
//Kewl = new Mongo.Collection('kewl')





if (Meteor.isClient) {
    Template.body.helpers({
        resolutions: function () {
     //     return Kewl.find();       // the #each function in the html page is calling each item in the resolutions. It figures out that the Kewl collection is multiple items. 
        
            if (Session.get('hideFinished')){
                return Resolutions.find({checked: {$ne: true}})
            }
            return Resolutions.find(); 
        },
        hideFinished: function() {
            return Session.get('hideFinished')
        }
      }); 
      
      
      
      
      // below intererets the text that is in the html name input field and inserts it onto the data base. Notice this is an event rather than a helper. 
    Template.body.events({
      
      'submit .new-resolution': function(event) {
       var title = event.target.title.value
       
       // the data is inserted into the Resolutions collection
       Resolutions.insert({
        title: title,   
        createdAt: new Date()
         
       });
       
       event.target.title.value = ""; // on submit, the input is cleared. 
       
       return false; // the previous function is ended. There is no page reload or something. 
      },
      'change .hide-finished': function(event){
          Session.set('hideFinished', event.target.checked);
      }
    });
    
    
    Template.kewlTemplate.events({
       
       'click .toggle-checked': function(){
           Resolutions.update(this._id, {$set:{checked: !this.checked}});
       },
       
       
       //delete
       'click .delete': function(){
           Resolutions.remove(this._id);
       } 
        
    });
    Accounts.ui.config({
       passwordSignupFields: "USERNAME_ONLY" 
    });

}





























if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
