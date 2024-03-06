import { docGetAllRoles, createRoleBody, docCreateRole, docUpdateRole } from "./admin/rolesDocs.js";

const swaggerApiDocumentation = {
    openapi: "3.0.1",
    info: {
        version: "1.3.0",
        title: "Flashplus Api - Documentation",
        description: "Apis for CBD super admin web app, branch admin web app, CBD Mobile app and facilitator app",
        termsOfService: "https://mysite.com/terms",
        contact: {
            name: "Shafaqat Mirza",
            email: "shafa's email",
            url: "https://devwebsite.com"
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    servers: [
        {
            url: "http://localhost:5314/api",
            description: "Local Server"
        },
        {
            url: "http://api.cadabamscare.com:5314/",
            description: "Development Server"
        },
        {
            url: "https://api.mysite.com",
            description: "Production Server"
        }
    ],
    tags: [
        {
            name: "diagnosticCenter"
        },
        {
            name: "Branch"
        },
        {
            name: "Employee"
        },
        {
            name: "Roles"
        },
        {
            name: "Customer"
        }
    ],
    paths: {
        "/role/all": {
            get: docGetAllRoles
        },
        "/role/create": {
            post: docCreateRole
        },
        "/role/update/{id}": {
            put: docUpdateRole
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: { createRoleBody }
    }
};

export default swaggerApiDocumentation;
