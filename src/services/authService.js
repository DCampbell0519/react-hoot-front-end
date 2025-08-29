const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/auth`

const signUp = async (formData) => {
    try {
        
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: 'POST', // instead of default GET request
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        console.log(res)
        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }

        if (data.token) {
            // sets a value into local storage
            localStorage.setItem('token', data.token)
            return JSON.parse(atob(data.token.split('.')[1])).payload // [header, payload, signature]
        }

        throw new Error('invalid response from server')

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const signIn = async (formData) => {
    try {
        
        const res = await fetch(`${BASE_URL}/sign-in`, {
            method: 'POST', // instead of default GET request
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        console.log(res)
        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }

        if (data.token) {
            // sets a value into local storage
            localStorage.setItem('token', data.token)
            // return the userId and password from the token
            return JSON.parse(atob(data.token.split('.')[1])).payload // [header, payload, signature]
        }

        throw new Error('invalid response from server')

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}





export {
    signUp,
    signIn,
}