import Toast from './Toast.vue'
const obj = {}
// 它再执行 install 的时候会默认传过来一个Vue
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el 对应的就是上面的 DIV
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj