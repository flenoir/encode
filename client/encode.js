
  Template.inputFile.events({

    'click .btn': function (evt) {
      evt.preventDefault();
      var input = $('.input_file').val(); // récupération avec Jquery de la valeur de l'input
      var inputAr = $('.aspect_ratio').val(); 
      var inputCodec = $('.codec').val(); 
      var inputok = input.replace("C:\\fakepath\\", "C:\\bin\\");
      var inputClean  = input.replace("C:\\fakepath\\", "");

      var searchedId = files.insert({name: inputok, status: 'inital', createdAt: moment().format("Do MMMM YYYY, h:mm:ss a")});

       var inputId = searchedId;

       var inputObject = {
        path : inputok,
        aspectRatio : inputAr,
        codec : inputCodec,
        id : inputId,
        name : inputClean
       };

       console.log(inputObject.path);
       console.log(inputObject.aspectRatio);
       console.log(inputObject.codec);
       console.log(inputObject.name);

          Meteor.call('sendEncode',inputok, inputAr, inputCodec, inputId, inputClean, function(error,response){
            if(error){
              console.log('ERROR :', error);
            }else{
              console.log('Response :', response);
            }
          })
       }
      
  });


 Template.show_file.helpers({
    file: function () {
      var search = files.find();
      return search;
      }
  });


// Template à ajouter pour permettre le rendu des input "select" de Materialize
 Template.show_file.onRendered(function() { 
    $('select').material_select();
});