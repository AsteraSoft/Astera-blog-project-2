$(function(){
    const url ='db.json';
    $('.submitBtn').on('click',function(){
        $.ajax({
            url:'db.json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.users.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    }())

