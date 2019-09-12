(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value,
          genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#post-form').submit( processForm );
})(jQuery);

$(document).ready(function(){
    $.ajax({
        url: 'https://localhost:44352/api/movie',
        dataType: 'json',
        type: 'get',
        async: true,
        data: JSON,
        success: function(data, textStatus, jQxhr){
            var table = $("#movie-table");
            $.each(data, function(idx, elem){
            table.append(`<tr><td>${elem.Title}</td><td>${elem.Director}
              </td><td>${elem.genre}</td><td><button onclick="GetId(${elem.MovieId})""
              class="btn btn-link" id="${elem.MovieId}">Update</button></td></tr>`);
            });
        },
        error: function(e){
              console.log(e.responseText);
        }
    });
});

function GetId (id){
    $.ajax({
        url: 'https://localhost:44352/api/movie',
        dataType: 'json',
        type: 'get',
        data: { id },
        success: function(data, textStatus, jQxhr){
            console.log(data);
        },
        error: function(e){
            console.log(e.responseText);
        }
    })
}
// var id = document.getElementbyId();
// $.ajax({
//     url: 'https://localhost:44352/api/movie',
//     dataType: 'json',
//     type: 'get',
//     contentType: 'application/json',
//     data: JSON.stringify(id),
//     success: function(data, textStatus, jQxhr){},
//     error: function(jqXhr, textStatus, errorThrown){
//         console.log ( errorThrown );
//     }
// })
