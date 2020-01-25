const swaggerJsDoc= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express');

//Routes
    /**
     * @swagger
     * /getUserData:
     * get:
     *   description: Use to request user details by userId
     *   responses:
     *       '200':
     *          description:A successful response
     */
swaggerOptions={
    swaggerDefinition:{
        info:{
            title:'User Details API',
            description:'User Details by userId',
            servers:[
                {
                  url: 'http://localhost:8000/ms/v10/auth/',
                  description: 'Local server'
                }],
        }
    },
    apis:['endpoints.js']
};

const specs=swaggerJsDoc(swaggerOptions)

module.exports=(app)=>{
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerOptions))
}