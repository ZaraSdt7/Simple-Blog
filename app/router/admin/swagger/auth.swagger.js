/**
 * @swagger
 *  components:
 *      schemas:
 *          UserRegister:
 *                     type: object
 *                     required:
 *                         -   user_name
 *                         -   mobile        
 *                     peroperties:
 *                          user_name:       
 *                                type: string
 *                                description: user_name register
 *                          mobile:
 *                                type: string
 *                                description: mobile register
 *          UserLogin:
 *                  type: object
 *                  required:
 *                      -   mobile
 *                      -   code
 *                  peroperties:
 *                       mobile:
 *                           type: string
 *                           description: user login with mobile
 *                       code:
 *                           type: integer
 *                           description: enter code login   
 */

/**
 * @swagger
 *   /user/register:
 *      post:
 *        tags: [(User-Authentication)]
 *        summary: register user with user_name,mobile
 *        requestBody:
 *            required: true
 *            content:
 *                application/x-www-form-urlencoded:
 *                    schema:
 *                         $ref: '#/components/schemas/UserRegister'
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/UserRegister'
 *        responses:
 *               200:
 *                  description: Success
 *               404:
 *                  description: BadRequest
 *               500:
 *                  description:    InternalServerError      
 */

/**
 * @swagger
 *   /user/login:
 *      post:
 *        tags: [(User-Authentication)]
 *        summary: login user with code,mobile
 *        description: login and get code for login
 *        requestBody:
 *            required: true
 *            content:
 *                application/x-www-form-urlencoded:
 *                    schema:
 *                        $ref: '#/components/schemas/UserLogin'
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/UserLogin'
 *        responses:
 *               200:
 *                  description: Success
 *               404:
 *                  description: BadRequest
 *               500:
 *                  description:    InternalServerError      
 */
