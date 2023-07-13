const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000

///Для использования Express в начале надо создать объект, который будет представлять приложение:
const app = express()     ///создаем объект приложения
app.use(cors())
app.use(express.json())  /////// для того чтобы наше приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))  // ////// для загрузки изображений
app.use('/api', router)

// app.get('/',(req,res)=>{
//     res.status(200).json({messsage:'WORKING'})
// })


//Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()        ///// установка подключения к базе данных
        await sequelize.sync()                ////   сверка состояния базы данных со схемой данных
               app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) ///// запуск сервера
        
    } catch (e) {
        console.log(e)
    }
}

start()
