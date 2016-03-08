


var Resolutions = new Mongo.Collection('resolutions');
//Kewl = new Mongo.Collection('kewl')





if (Meteor.isClient) {
    Meteor.subscribe("resolutions");   // show the resolutions database results to the client
    
   
    Template.body.helpers({
        
        resolutions: function () {
            if (Session.get('hideFinished')){
                return Resolutions.find({checked: {$ne: true}})
            }
            return Resolutions.find(); 
        },
        hideFinished: function() {
            return Session.get('hideFinished')
        }
      }); 
      
      
      
      
    Template.body.events({
        
      'submit .new-resolution': function(event) {      //when the submit input type is clicked in the new-resolution class - do the following function. 
    
       var title = event.target.title.value            // event.target.title.value gives us the value of the input. 
    
        Meteor.call("addResolution", title);           // calls addResolution function with title param. 
   
       event.target.title.value = ""; // on submit, the input is cleared. 
    
       return false; // the previous function is ended. There is no page reload or something. 
      },
      
      
      
      'change .hide-finished': function(event){                 //when hidefinished is clicked (don't know what change is referring to) 
          Session.set('hideFinished', event.target.checked);    // session means there are no database changes. 
      }
      
      
    });
    
    
    

    Accounts.ui.config({                            // command from the accounts library. User uses username rather than email(default) to sign up. 
     
       passwordSignupFields: "USERNAME_ONLY"    
    
        
    });

}







Meteor.methods({                           
    addResolution: function(title) {     // defines title, createdAt, and owner schema, and gives values to a new input entry. 
        Resolutions.insert({
            title: title,
            createdAt: new Date(),
            owner: Meteor.userId()
        });
        
        
    },
    updateResolution: function(id, checked){                    //this, and the following meteor methods are called in resolution.js from click events. 
        var res = Resolutions.findOne(id);
        
        if(res.owner !== Meteor.userId()){
            throw new Meteor.Error('not-authorized')
        }
        Resolutions.update(id, {$set: {checked: checked}});
    },
    deleteResolution: function(id){
        var res = Resolutions.findOne(id);
        
        if(res.owner !== Meteor.userId()){
            throw new Meteor.Error('not-authorized')
        }
        Resolutions.remove(id)
    },
    setPrivate: function(id, private){
        var res = Resolutions.findOne(id);
        
        if(res.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Resolutions.update(id, {$set: {private: private}});
  
        
    }
});
























if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish("resolutions", function() {        // serve data in the resolution collection to the client
      return Resolutions.find({
          $or: [
              { private: {$ne: true}},              // if the resolution is not set to private
              { owner: this.userId}                 // or if the owner is equel to the userid. 
               ]
      });
  });
}
