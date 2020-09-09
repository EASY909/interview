function updataview() {
    console.log("视图更新");
}
const arrpro=Object.create(Array.prototype);
["push","pop","shift",'unshift', 'splice'].forEach(item=>{
    arrpro[item]=function(){
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
                value = newValue;
                observe(newValue);
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
        target.__proto__=arrpro;
    }
    for (const key in target) {
        defineReactive(target, key, target[key])
    }
}