class Square{

    constructor(x , y , size , color){

        this.x = x 
        this.y = y 
        this.size = size
        this.color = color
        this.scale = 0
        this.grown = false
        this.easing = .095
        this.direction = undefined
        this.slided = false
        this.oldx = this.x 
        this.oldy = this.y
        this.targetx = undefined
        this.targety = undefined
    }

    render(){

        c.save()
        c.translate(this.x , this.y)
        c.rotate(this.angle)
        c.beginPath()
        c.lineWidth = .3
        c.fillStyle = this.color
        c.strokeStyle = "white"
        c.rect(-this.scale/2 , -this.scale/2 , this.scale , this.scale)
        c.fill()
        c.stroke()
        c.closePath()
        c.restore()

    }

    grow(){

        if(!this.grown){

            var tempsize = (this.size - this.scale) * this.easing
            this.scale += tempsize

            if(Math.abs(tempsize) < .05){

                this.grown = true 
                this.scale = this.size

            }
        }

    }

    slide(){

        if(this.direction === "left"){

            this.targetx = this.oldx - this.size/2
            var dx = (this.x - this.targetx ) * this.easing
            this.x -= dx

            if(Math.abs(dx) < .05){

                this.slided = true 
                this.x = this.targetx
            }
        }

        if(this.direction === "right"){

            this.targetx = this.oldx + this.size/2
            var dx = (this.targetx - this.x ) * this.easing
            this.x += dx


            if(Math.abs(dx) < .05){

                this.slided = true 
                this.x = this.targetx
            }
        }


        if(this.direction === "up"){

            this.targety = this.oldy - this.size/2
            var dy = (this.y - this.targety ) * this.easing
            this.y -= dy

            if(Math.abs(dy) < .05){

                this.slided = true 
                this.y = this.targety
            }
        }

        if(this.direction === "down"){

            this.targety = this.oldy + this.size/2
            var dy = (this.targety - this.y) * this.easing
            this.y += dy


            if(Math.abs(dy) < .05){

                this.slided = true 
                this.y = this.targety
            }
        }


    }

}