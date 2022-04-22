const deleteUser = async (deleteAccount, deleteData) => {
    try {
        await deleteData()
    } catch (error) {
        return 'error'
    }
    try {
        await deleteAccount()
        return 'success'
    } catch (error) {
        return 'error'
    }
}

export default deleteUser
