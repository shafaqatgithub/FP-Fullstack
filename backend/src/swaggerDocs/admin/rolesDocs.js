export const docGetAllRoles = {
    tags: ["Roles"],
    description: "Get all blog details ",
    operationId: "GetAllRolesId",
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        200: {
            description: "Blogs fetched successfully!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            data: {
                                type: "array",
                                example: [
                                    [
                                        {
                                            _id: "65da0892b4f1e25d8f72a640",
                                            roleName: "receptionist",
                                            status: 2,
                                            createdAt: "2024-02-24T15:17:38.935Z"
                                        },
                                        {
                                            _id: "65da08b4b4f1e25d8f72a643",
                                            roleName: "branch admin",
                                            status: 1,
                                            createdAt: "2024-02-24T15:18:12.262Z"
                                        }
                                    ]
                                ]
                            },
                            isSuccess: { type: "boolean", example: true }
                        }
                    }
                }
            }
        }
    }
};
export const docCreateRole = {
    tags: ["Roles"],
    description: "Create a Role",
    operationId: "createRoleId",
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/createRoleBody"
                }
            }
        }
    },
    responses: {
        201: {
            description: "Role created successfully!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            data: { type: "string", example: "Successfully created the role." },
                            isSuccess: { type: "boolean", example: true }
                        }
                    }
                }
            }
        }
    }
};

export const docUpdateRole = {
    tags: ["Roles"],
    description: "Update a Role",
    operationId: "UpdateRoleId",
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/createRoleBody"
                }
            }
        }
    },
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id should be passed in the url",
            required: true,
            schema: {
                type: "string",
                example: "65da0892b4f1e25d8f72a640"
            }
        }
    ],
    responses: {
        200: {
            description: "Role updated successfully!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            data: { type: "string", example: "Successfully updated the role." },
                            isSuccess: { type: "boolean", example: true }
                        }
                    }
                }
            }
        }
    }
};

export const createRoleBody = {
    type: "object",
    properties: {
        roleName: {
            type: "string",
            example: "receptionist",
            required: true
        },
        status: {
            type: "string",
            example: 1,
            required: true
        }
    }
};
