$(function() {
    // GET/READ
    // $('#sub-button').on('click', );

    const loadDatap = function() {
        $.ajax({
            url: 'http://localhost:3000/posts',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(post) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + post.id + '</td>\
                            <td><input type="text" class="userId" value="' + post.userId + '"></td>\
                            <td><input type="text" class="categoryId" value="' + post.categoryId + '"></td>\
                            <td><input type="text" class="title" value="' + post.title + '"></td>\
                            <td><input type="text" class="body" value="' + post.body + '"></td>\
                            <td>\
                            <button class="update-button btn btn-outline-info">Edit</button>\
                            <button class="delete-button  btn btn-outline-danger"">Delete</i></button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    };

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        let titleInput = $('#title');
        let DesInput = $('#Describtion');
        let UID = $('#UID');
        let CID = $('#CID');
        
        $.ajax({
            url: 'http://localhost:3000/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            userId: UID.val(),
            categoryId: CID.val(),
            title: titleInput.val(),
            body:   DesInput.val()
          
        }),
            
            success: function(response) {
                console.log(response);
                UID.val('');
                CID.val('');
               titleInput.val('');
                DesInput.val('');
                

                loadDatap();
                // $('#sub-button').click();
            }
        });
    });

      // UPDATE/PUT
      $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newUser = rowEl.find('.userId').val();
        var newCate = rowEl.find('.categoryId').val();
        var newTitle = rowEl.find('.title').val();
        var newBody = rowEl.find('.body').val();
       
        // console.log(newUser);
        // console.log(newCate);
        // console.log(newTitle); 
        // console.log(newBody); 
       

        $.ajax({
            url:   'http://localhost:3000/posts/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ title: newTitle, body: newBody, id: id, userId:newUser, categoryId:newCate  }),
            success: function(response) {
                loadDatap();
                // $('#sub-button').click();
            }
        });
    });

     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/posts/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response[0]);
                // $('#sub-button').click();
                loadDatap();
            }
        });
    });
   // $('#sub-button').click();
   loadDatap();
})


