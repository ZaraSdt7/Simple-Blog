/**
 * @swagger
 *  components:
 *      schemas:
 *          UserRegister:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   user_name
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  user_name:
 *                      type: string
 *                      description: the user mobile for signup/signin
  *          UserLogin:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP 
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
