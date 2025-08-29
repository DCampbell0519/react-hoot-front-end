const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/hoots`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        // console.log(res)

        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }

        return data

    } catch (error) {
        console.log(error)
    }
}

const show = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        // console.log(res)

        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }

        return data

    } catch (error) {
        console.log(error)
    }
}

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData)
        })
        // console.log(res)

        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }

        return data

    } catch (error) {
        console.log(error)
    }
}

const createComment = async (hootId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(commentFormData)
        })
        // console.log(res)

        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }

        return data

    } catch (error) {
        console.log(error)
    }
}

export {
    index,
    show,
    create,
    createComment,
}