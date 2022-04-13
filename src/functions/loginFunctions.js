const logInGitHub = async (setLoading, setError, navigate, loginWithGitHub) => {
    try {
        await loginWithGitHub()
        navigate('/')
    } catch (error) {
        setError(error.message)
        console.log(error)
    } finally {
        setLoading(false)
    }
}

const logInTwitter = async (setLoading, setError, navigate, loginWithTwitter) => {
    try {
        await loginWithTwitter()
        navigate('/')
    } catch (error) {
        setError(error.message)
        console.log(error)
    } finally {
        setLoading(false)
    }
}

const logInGoogle = async (setLoading, setError, navigate, loginWithGoogle) => {
    try {
        await loginWithGoogle()
        navigate('/')
    } catch (error) {
        setError(error.message)
        console.log(error)
    } finally {
        setLoading(false)
    }
}

const handleLogin = async (setLoading, setError, navigate, logIn, email, password) => {
    try {
        await logIn(email, password)
        navigate('/')
    } catch (error) {
        setError(error.message)
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}

export {logInGitHub, logInTwitter, logInGoogle, handleLogin}