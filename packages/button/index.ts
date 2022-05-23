import Button from "./src/index";
Button.install = function (Vue: any) {
  Vue.components(Button.name, Button);
};
export default Button;
