function updataview() {
    console.log("视图更新");
}

function reactive(target = {}) {
    if (typeof target !== 'object' || target == null) {
        // 不是对象或数组，则返回
        return target
    }
    const proxyConf = {
        get(target, key, receiver) {
            const ownKeys = Reflect.ownKeys(target);
            if (ownKeys.includes(key)) {
                console.log('get', key) // 监听
            }

            const result = Reflect.get(target, key, receiver);
            return reactive(result);
        },
        set(target, key, val, receiver) {
            if (val === target[key]) {
                return true
            }

            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                console.log('已有的 key', key)
            } else {
                console.log('新增的 key', key)
            }

            const result = Reflect.set(target, key, val, receiver)
            console.log('set', key, val)
            // console.log('result', result) // true
            if(result) updataview();
            return result // 是否设置成功
        },
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key)
            console.log('delete property', key)
            // console.log('result', result) // true
            if(result) updataview();
            return result // 是否删除成功
        }
    }
    const observed = new Proxy(target, proxyConf);
    return observed;
}

const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        city: 'beijing',
        a: {
            b: {
                c: {
                    d: {
                        e: 100
                    }
                }
            }
        }
    }
}

const proxyData = reactive(data)