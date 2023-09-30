

export class Collision {
    static checkCollision(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();

        var rightmostLeft = a.left < b.left ? b.left : a.left;
        var leftmostRight = a.right > b.right ? b.right : a.right;

        if (leftmostRight <= rightmostLeft) {
            return false;
        }

        var bottommostTop = a.top < b.top ? b.top : a.top;
        var topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

        return topmostBottom > bottommostTop;
    }
}