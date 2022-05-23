import Image from "./src/index";
Image.install = function (Vue: any) {
  Vue.components(Image.name, Image);
};
export default Image;
