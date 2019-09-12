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
            $.each(data, function(index, element){
            table.append(`<tr id="row${element.MovieId}">
            <td contenteditable id="title${element.MovieId}"'>${element.Title}
            </td><td contenteditable id="director${element.MovieId}">${element.Director}
            </td><td contenteditable id="genre${element.MovieId}">${element.genre}</td>
            <td><button onclick="SubmitEdit(${element.MovieId})" class="btn btn-link" 
            id="${element.MovieId}" type="submit">Update</button></td></tr>`);
            });
        },
        error: function(e){
            console.log(e.responseText);
        }
    });
});

function SubmitEdit(id){

    var model = {
        Title: document.getElementById(`title${id}`).innerHTML,
        Director: document.getElementById(`director${id}`).innerHTML,
        genre: document.getElementById(`genre${id}`).innerHTML
    };

    $.ajax({
        url: `https://localhost:44352/api/movie/${id}`,
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(model),
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    })
}

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
