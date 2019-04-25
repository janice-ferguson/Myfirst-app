$(document).ready(function () {
    $('.delete-material').on('click', function (e) {
        $target = $(e.target);
        console.log($target.attr('data-id'));
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/material/' + id,
            success: (response) => {
                alert('Deleting Material');
                window.location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
})