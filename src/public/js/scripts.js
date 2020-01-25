$('#comments').hide();

$('#btnLike').click(function(e){
    e.preventDefault();
    let imgId = $(this).data('id');
    $.post('/images/'+imgId+'/like').done(
        data => {
            $('.likes-count').text(data.likes);
        }
    )
});

$('#btnDelete').click(function(e){
    e.preventDefault();
    let res = confirm('Are you shure you want to delete this image?');
    if(res){
        let id = $(this).data('id');
        $.ajax({
            url: '/images/'+id,
            type: 'DELETE'
        }).done(function(result){
            window.location.replace(result);
        });
    }
});

$('#btnComment').click(function(e){
    e.preventDefault();
    $('#comments').slideToggle();
});