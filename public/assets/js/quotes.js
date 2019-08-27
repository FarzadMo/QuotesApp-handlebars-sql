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





});