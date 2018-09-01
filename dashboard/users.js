$(function(){
    //  Get 
     const url= 'http://localhost:3000/users';
          function row (el)
         {
                    var tbodyEl = $('tbody');
 
                     //tbodyEl.html('');
                     console.log(el)
                     tbodyEl.append('\
                         <tr>\
                             <td class="id">' + el.id + '</td>\
                             <td><input type="text" class="name" value="' + el.name + '"></td>\
                             <td><input type="text" class="email" value="' + el.email + '"></td>\
                             <td>\
                             <button class="update-button btn btn-outline-info">Edit</button>\
                             <button class="delete-button btn btn-outline-danger"">Delete</i></button>\
                             </td>\
                         </tr>\
                     ');
                 
             
         }
     
                     fetch(url)
                     .then(res=>res.json())
                     .then((data)=>{
                         data.forEach(function(el) {
                        row(el);
                         });
                     })
 //Post
 
     let userInput = $('#username');
      let EmailInput = $('#Email');
                             
     $("#sub-button").on("click", () => {
 
                         $.ajax({
                                         url: 'http://localhost:3000/users',
                                         method: 'POST',
                                         contentType: 'application/json',
                                         data: JSON.stringify({
                                         name: userInput.val(),
                                         email: EmailInput.val()
                                     }),
                                         success: function(response) {
                                             console.log(response);
                             
                                             userInput.val('');
                                             EmailInput.val('');
                                         
                                         }
                                     });
 
                     })
 //Delete
                     $('table').on('click', '.delete-button', function() {
                         var rowEl = $(this).closest('tr');
                         var id = rowEl.find('.id').text();
                         console.log(rowEl.html);
 
                         $("#sub-button").on("click", () => {
 
                         $.ajax({
                             url: 'http://localhost:3000/users/'+ id,
                             method: 'DELETE',
                             contentType: 'application/json',
                             success: function(response) {
                                 console.log(response[0]);
                                $('#sub-button').click();
                             }
                         });
                         
                     });
                    
                     });
 
 //put
 
 
 $('table').on('click', '.update-button', function() {
     var rowEl = $(this).closest('tr');
     var id = rowEl.find('.id').text();
     var newTitle = rowEl.find('.name').val();
     var newBody = rowEl.find('.email').val();
     console.log(newTitle); 
     console.log(newBody); 
 $.ajax({
                 url:   'http://localhost:3000/users/'+ id,
                 method: 'PUT',
                 contentType: 'application/json',
                 data: JSON.stringify({ name: newTitle, email: newBody  }),
                 success: function(response) {
                    // loadDatap();
                      $('#sub-button').click();
                 }
             });
         });
 
             });
 