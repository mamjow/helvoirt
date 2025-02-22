$(document).ready(function () {

    $("#NewPostModal").on("submit", ".js-book-post-form", function () {
        var form = $(this);
        $.ajax({
            url: form.attr("action"),
            data: form.serialize(),
            type: form.attr("method"),
            dataType: 'json',
            success: function (data) {
                if (data.form_is_valid) {
                    // $("#book-table tbody").html(data.html_book_list);  // <-- Replace the table body
                    $("#NewPostModal").modal("hide");  // <-- Close the modal
                }
                else {
                    $("#NewPostModal .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    });


    $("#NewPostModalCall").click(function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#NewPostModal").modal("show");
            },
            success: function (data) {
                $("#NewPostModal .modal-content").html(data.html_form);
            }
        });


    });

});

$(function () {

    /* Functions */

    var loadForm = function () {
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#NewPostModal").modal("show");
            },
            success: function (data) {
                $("#NewPostModal .modal-content").html(data.html_form);
            }
        });
    };

    var saveForm = function () {
        var form = $(this);
        $.ajax({
            url: form.attr("action"),
            data: form.serialize(),
            type: form.attr("method"),
            dataType: 'json',
            success: function (data) {
                if (data.form_is_valid) {
                    // $("#book-table tbody").html(data.html_book_list);
                    $("#modal-book").modal("hide");
                }
                else {
                    $("#modal-book .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };


    /* Binding */

    // Create book
    $(".js-create-book").click(loadForm);
    $("#NewPostModal").on("submit", ".js-book-create-form", saveForm);

    // Update book
    $("#book-table").on("click", ".js-update-book", loadForm);
    $("#NewPostModal").on("submit", ".js-book-update-form", saveForm);

    // Delete book
    $("#book-table").on("click", ".js-delete-book", loadForm);
    $("#NewPostModal").on("submit", ".js-book-delete-form", saveForm);

});