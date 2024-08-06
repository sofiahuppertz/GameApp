

document.addEventListener('DOMContentLoaded', () =>
{
    let _board= new board(document.querySelector('.board'));

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            message.innerHTML = 'Game Started';
            movePaddles(_board, paddle1, paddle2);
            animateBall(_ball, _board, paddles, panel);
        }
    }); 

});
