## Instructions

1. Bootswatch min.css file in src, imported into index.js
2. React Router v6 formatting in app.js
3. seeder.js used to import/delete all data for testing, see package.json for syntax
4. devDependancies, nodemon used to autorestart server on change, concurrently used to run frontend/backend
5. Backend package.json - "type": "module", for es6 import/export
6. Make sure backend package.json has proxy so that front end is pulling from backend port - "proxy": "http://127.0.0.1:5000"


###### Backend env file

1. NODE_ENV = development
2. PORT = 5000
3. MONGO_URI = uri, password before the ? include project name 
4. JWT_SECRET = create a jwt secret

