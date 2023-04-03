export default class Ball {
    constructor(ballElem){
        this.ballElem = ballElem
    }
}

get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
}

get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
}

set x(value) {
    this.ballElem.style.setProperty("--x", value)
}

set y() {
    this.ballElem.style.setProperty("--y", value)
}

refresh(delta) {
this.x = 5
}