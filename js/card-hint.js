window.onload = function(){ 

    document.addEventListener("click", (evt) => {
        var hintIcon = document.getElementById("hintIcon");
        var formHint = document.querySelector('.form-hint');
        var targetElement = evt.target; 

        if (targetElement == hintIcon) {
            formHint.classList.toggle('active')
        } else if (targetElement !== formHint) {
            formHint.classList.remove('active');
        };
    });

}