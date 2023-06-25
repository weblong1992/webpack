import $ from "jquery";
import "./css/index.less";

$(function () {
  $("li:odd").css("backgroundColor", "red");
  $("li:even").css("backgroundColor", "green");
});

class Person {
  static info = { name: "zs", age: 20 };
}

consol.log(Person.info);
