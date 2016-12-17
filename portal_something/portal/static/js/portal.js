function getPosts() {
   $.getJSON( "http://127.0.0.1:8000/api/posts/", function( data ) {
     var html = "";
        console.log(data)
        $.each(data.objects, function( key, value ){
             console.log( key + ": " + value.title );
             html =  html + '<tr>'+
                    ' <td>' + value.title + '</td>' +
                    ' <td>' + value.author + '</td>' +
                    ' <td>' + value.created_date + '</td>' +
                    ' <td> <a href="http://127.0.0.1:8000/edit/'+ value.pk +'"> Edit </a></td>' +
                    ' <td> <a href="#" onclick="deletePost('+value.pk+')"> Delete </a></td>' +
                    ' <td> <a href="http://127.0.0.1:8000/details/'+ value.pk +'" > Details </a></td>' +
                    '</tr>'       
       });
        $("tbody").html(html)
        $('#example').DataTable();
    });
}


function deletePost(pk) {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/posts/' + pk,
        type: 'DELETE',
        success: function(result) {
            location.reload();
        }
    });
}


function fillForm(pk) {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/posts/' + pk,
        type: 'GET',
        success: function(result) {
            console.log(result)
            var post = result
            $("#title").attr("value", post.title);
            $("#author").attr("value", post.author);
            $("#text").html(post.text);
        }
    });
}

function getPost(pk) {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/posts/' + pk,
        type: 'GET',
        success: function(result) {
            console.log(result)
            var post = result
            $("#title").html(post.title);
            $("#author").html(post.author);
            $("#text").html(post.text);
        }
    });
}

function editPost(pk) {
    console.log(JSON.stringify($("#edit-form").serialize()))
    $.ajax({
        url: 'http://127.0.0.1:8000/api/posts/' + pk,
        data:  JSON.stringify($("#edit-form").serialize()),
        type: 'PUT',
        contentType: "application/json",
        success: function(result) {
            console.log("UHULL")
            //window.location.href = "http://127.0.0.1:8000/list";
        }
    });
}

function newPost() {
    console.log($("#new-form").serialize())
    $.ajax({
        url: 'http://127.0.0.1:8000/api/posts/',
        data:  JSON.stringify($("#new-form").serialize()),
        type: 'POST',
        contentType: "application/json",
        success: function(result) {
            console.log("UHULL")
            //window.location.href = "http://127.0.0.1:8000/list";
        }
    });
}




