(function() {
    var pacman = document.getElementById("pacmanImg")
    var fantasmas = document.getElementsByClassName("fantasmaImg");
    var pacmanLeftPosition = 0;

    //lista de acciones
    var towardsGhostFromLeft = 1;
    var backwardGhostToLeft = 0;
    var towardsGhostFromRight = 0;
    var backwardGhostToRight = 0;

    //enlaces de imágenes
    var ghostBlueRight = "img/ghost-blue-r.png";
    var ghostBlueLeft = "img/ghost-blue-l.png";
    var ghostOrangeRight = "img/ghost-orange-r.png";
    var ghostOrangeLeft = "img/ghost-orange-l.png";
    var ghostRedLeft = "img/ghost-red-l.png";
    var ghostRedRight = "img/ghost-red-r.png";
    var pacmanLeft = "img/pacman-l.png";
    var pacmanRight = "img/pacman-r.png";

    setInterval(function() {

        //mover el fantasma hacia el lado izquierdo
        if (towardsGhostFromLeft) {
            pacmanLeftPosition++;
            pacman.style.left = pacmanLeftPosition + "px";

            if (pacmanLeftPosition == 170) {
                towardsGhostFromLeft = 0;
                backwardGhostToLeft = 1;
                pacman.src = pacmanLeft;
                fantasmas[0].src = ghostBlueLeft;
                fantasmas[1].src = ghostOrangeLeft;
                fantasmas[2].src = ghostRedLeft;
            }
        }
        //mover el fantasma desde atrás hacia el lado izquierdo
        else if (backwardGhostToLeft) {
            pacmanLeftPosition--;
            pacman.style.left = pacmanLeftPosition + "px";
            if (pacmanLeftPosition == 0) {
                towardsGhostFromRight = 1;
                backwardGhostToLeft = 0;
                pacmanLeftPosition = 550;
                pacman.style.left = pacmanLeftPosition + "px";
            }
        }
        //mover el fantasma hacia el lado derecho
        else if (towardsGhostFromRight) {
            pacmanLeftPosition--;
            pacman.style.left = pacmanLeftPosition + "px";
            if (pacmanLeftPosition == 410) {
                towardsGhostFromRight = 0;
                backwardGhostToRight = 1;
                pacman.src = pacmanRight;
                fantasmas[0].src = ghostBlueRight;
                fantasmas[1].src = ghostOrangeRight;
                fantasmas[2].src = ghostRedRight;
            }
        }
        //mover el fantasma desde atrás hacia el lado derecho
        else if (backwardGhostToRight) {
            pacmanLeftPosition++;
            pacman.style.left = pacmanLeftPosition + "px";
            if (pacmanLeftPosition == 550) {
                towardsGhostFromLeft = 1;
                backwardGhostToRight = 0;
                pacmanLeftPosition = -1;
                pacman.style.left = pacmanLeftPosition + "px";
            }
        }

    }, 10);
})();