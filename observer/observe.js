function updataview() {
    console.log("视图更新");
}
const arrProp=Object.create(Array.prototype);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(item=>{
    arrProp[item]=function(){
        updataview();
        Array.prototype[item].call(this,...arguments);
    }
})
function defineReactive(target, key, value) {
    observe(value);
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (value !== newValue) {
                observe(newValue);
                value = newValue;
                updataview();
            }
        }
    })
}
function observe(target) {
    if (typeof target !== "object" || target === null) {
        return target;
    }
    if(Array.isArray(target)){
        target.__proto__=arrProp;
    }
    for (const key in target) {
        defineReactive(target, key, target[key]);
    }
}
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
    nums: [10, 20, 30]
}
observe(data);