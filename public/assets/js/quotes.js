$(function(){

    $(".delquote").on("click", function(event){
        var id = $(this).data("id");
       
        $.ajax("/api/quotes/"+id, {
            type: "DELETE"
        }).then(function(){
            location.reload();
        });
        
    });

    $(".create-form").on("submit", function(event){
        event.preventDefault();

        submitData = {
            author: $("#auth").val().trim(),
            quote: $("#quo").val().trim()
        }
        
        $.ajax("/api/quotes", {
            type: "POST",
            data: submitData
        }).then(function(){
            location.reload();
        });
    });

    $(".update-form").on("submit", function(event){

        event.preventDefault();
        updateData = {
            quote: $("#quo").val().trim(),
            author: $("#auth").val().trim()
        }
        var id = $(this).data("id");
        // console.log(updateData.quote);
        // console.log(updateData.author);
        
        $.ajax("/api/quotes/"+id, {
            type: "PUT",
            data: updateData
        }).then(function(){
            location.assign("/");
        });
    });



});