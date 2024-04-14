let canvas = $("canvas")[0]
let c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

let squares = []
let size = 500
let order = 0
let maxorder = 9

function CreateSquares(){

    for(var i = 0 ; i < squares.length ; i++){

        if(squares[i].grown && squares[i].slided){
        
            var newsize = squares[i].size/2
            var sx = squares[i].x - squares[i].size/4
            var sy = squares[i].y - squares[i].size/4

            squares.splice(i,1)

            for(r = 0 ; r < 2 ; r++){
                for(var c = 0 ; c < 2 ; c++){
        
                    squares.unshift(new Square(sx + c * newsize , sy + r * newsize , newsize , "black"))
                }
            }
        
        }

    }

}

function RenderFractal(){

    if(squares.length === 0){

        squares.push(new Square(canvas.width/2 , canvas.height/2 , size , "black"))
        squares[0].slided = true
        order++
    }

    if(order <= maxorder){

        CreateSquares()

        if(order === 1){

            $(".output").html("order " + order + " has " + squares.length + " square")

        }else{

            $(".output").html("order " + order + " has " + squares.length + " squares")

        }

        if(squares.length > 1){

            if(order % 2 === 0){

                for(var i = 0 ; i < squares.length ; i+=4){

                    squares[i].direction = "left"
                    squares[i+1].direction = "left"
                    squares[i+2].direction = "right"
                    squares[i+3].direction = "right"

                }

            }else{

                for(var i = 0 ; i < squares.length ; i+=4){

                    squares[i].direction = "down"
                    squares[i+1].direction = "up"
                    squares[i+2].direction = "down"
                    squares[i+3].direction = "up"

                }

            }

        }

        order++
        setTimeout(RenderFractal , 2500)

    }else{

        $(".output").html("Fractal generated")
        $(".controls button").prop("disabled" , false)
        cancelAnimationFrame(frameId)
        return

    }

}

function renderCanvas(){

    c.clearRect(0,0,canvas.width,canvas.height)

    squares.forEach(square => {

        square.render()
        square.grow()

        if(square.grown){

            square.slide()
        }
     
    })

    frameId = requestAnimationFrame(renderCanvas)

}

$(".controls button").on("click" , function(){

    squares = []
    order = 0
    $(".controls button").prop("disabled" , true)
    RenderFractal()
    renderCanvas()  

})


