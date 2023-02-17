class YouClass{
  static myFunction(){
    console.log("hello")
  }
}




class MyClass extends YouClass {
  constructor(firstBrother = "shamir", secondBrother = "shahzaib") {
    this.firstBrother = firstBrother;
    this.secondBrother = secondBrother;
  }
  chnageFirstBrotherName(name) {
    this.firstBrother = name;
  }
  changeSecondBrotherName(name) {
    this.secondBrother = name;
  }
  static myName(){
    console.log("MOhsin")
  }
}

MyClass.myFunction()