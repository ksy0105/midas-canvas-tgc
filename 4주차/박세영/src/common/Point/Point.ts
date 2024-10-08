export class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(point: Point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  subtract(point: Point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  multiply(value: number) {
    this.x *= value;
    this.y *= value;
    return this;
  }

  collide(point: Point, width: number, height: number) {
    if(this.x >= point.x && 
      this.x <= point.x + width &&
      this.y >= point.y &&
      this.y <= point.y + height) {
        return true;
      } else {
        return false;
      }
  }

  clone() {
    return new Point(this.x, this.y);
  }
}