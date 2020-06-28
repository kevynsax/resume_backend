export const httpStatusCode = {
    success: 200,
    created: 201,
    internalServerError: 500
};

export const port: number = parseInt(process.env.PORT || "3000", 10);
export const dbConnection: string = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/resume-db";