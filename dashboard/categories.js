$(function() {
    // GET/READ
    
  //  $('#sub-button').on('click', function() {
    const loadDatapg = function() {
        $.ajax({
            url: 'http://localhost:3000/categories',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(el) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="name" value="' + el.name + '"></td>\
                            <td>\
                            <button class="update-button btn btn-outline-info">Edit</i></button>\
                            <button class="delete-button  btn btn-outline-danger"">Delete</button>\
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

        var createInput1 = $('#cate');
        
        $.ajax({
            url: 'http://localhost:3000/categories',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            name: createInput1.val(),}),
            success: function(response) {
                console.log(response);

                createInput1.val('');
               // $('#sub-button').click();
               loadDatapg();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        

        $.ajax({
            url: 'http://localhost:3000/categories/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: newName, id: id  }),
            success: function(response) {
                
                //$('#sub-button').click();
                loadDatapg();
            }
        });
    });

     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/categories/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response[0]);
               // $('#sub-button').click();
               loadDatapg();
            }
        });
    });
   // $('#sub-button').click();
   loadDatapg();
})

