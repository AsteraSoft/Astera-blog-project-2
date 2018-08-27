


$(function() {
    // GET/READ
    let userIds =1; 
    let categoryIds=1;
    $('#sub-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/comments',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                response.forEach(function(note) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + note.id + '</td>\
                            <td><input type="text" class="postId" value="' + note.postId + '"></td>\
                            <td><input type="text" class="userId" value="' + note.userId + '"></td>\
                            <td><input type="text" class="body" value="' + note.body + '"></td>\
                            <td>\
                            <button class="update-button btn btn-outline-info">Edit</button>\
                            <button class="delete-button  btn btn-outline-danger"">Delete</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var postInput = $('#PID');
        var userInput = $('#UID');
        var commentInput1 = $('#comments');
       
        $.ajax({
            url: 'http://localhost:3000/comments',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            postId :postInput.val(),
            userId: userInput.val(),
            body: commentInput1.val(),
           }),
            success: function(response) {
                console.log(response);
                postInput.val('');
                userInput.val('');
                commentInput1.val('');
                $('#sub-button').click();
            }
        });
    });

      // UPDATE/PUT
      $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var postId = rowEL.find('.postId').val();
        var newUser = rowEl.find('.userId').val();
        var newBody = rowEl.find('.body').val();
       
        console.log(postId); 
        console.log(newUser); 
        console.log(newBody); 

        $.ajax({
            url: 'http://localhost:3000/comments/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({body: newBody, id: id, postId:postId, userId:newUser  }),
            success: function(response) {
                
                $('#sub-button').click();
            }
        });
    });

     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/comments/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response[0]);
                $('#sub-button').click();
            }
        });
    });
    $('#sub-button').click();
})






























