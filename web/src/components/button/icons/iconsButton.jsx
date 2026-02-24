

import { defineComponent } from 'vue'
import IconRemixTemp from './IconRemixTemp.vue'
export default defineComponent(() => {
    const state = ref(0)
    const onClick = () => {
        state.value++;
        console.log(state.value)
    }
    return () => (
        <div>
            <h3>state: {state.value}</h3>
            <button onClick={onClick}>点击</button>
            <IconRemixTemp name="ri-add-line" />
        </div>
    )
})

// import IconRemixTemp from './IconRemixTemp.vue'
// export default defineComponent({
//     render() {
//         return
//         <>
//             <IconRemixTemp name="ri-add-line" />
//             222
//             <el-button > 说的是</el-button>
//         </>
//     }
// })
//export const AddIconBtn1 = () => <IconRemixTemp name="ri-add-line" />
// export default defineComponent({
//     render() {
//         return <div>
//             我是一个jsx中的div
//             <p>我是一个p结点</p>
//         </div>

//     }
// })