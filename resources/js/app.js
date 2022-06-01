import { createApp } from 'vue'
import SalaryCalculator from "./components/SalaryCalculator"

const app = createApp({

})

app.component('SalaryCalculator', SalaryCalculator)

app.mount('#app')
