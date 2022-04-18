const deleteUser = async (deleteAccount) => {
    try {
        await deleteAccount()
        return "success"
    } catch (error) {
        return "error"
    }
}

export default deleteUser
