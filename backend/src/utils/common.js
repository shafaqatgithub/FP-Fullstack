const handleResponse = (
    data = null,
    isSuccess = false,
    statusCode = 500,
    errorMessage = null,
    warningMessage = null,
    totalRecords = null,
    totalPages = null,
    recordsPerPage = null
) => ({
    data,
    isSuccess,
    statusCode,
    warningMessage,
    errorMessage,
    totalRecords,
    totalPages,
    recordsPerPage
});

export { handleResponse };
