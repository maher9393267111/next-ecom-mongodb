const baseUrl = 'http://localhost:3000';


export const getData = async (url) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'GET',
        // headers: {
        //     'Authorization': token
        // }
    })

    const data = await res.json()
    return data
}





export const postData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': token
        // },
        // body: JSON.stringify(post)
        body : post
    })

    const data = await res.json()
    return data
}