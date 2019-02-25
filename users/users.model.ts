const users = [
    {id: '1', name: 'user 1', email: 'first@mail.com'},
    {id: '2', name: 'user 2', email: 'second@mail.com'}
]

export class User {

    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }

    static findById(id: string): Promise<any>{
        return new Promise(resolve=>{
            const filtered = users.filter(user => user.id === id)
            let user = undefined
            if (filtered.length > 0){
                user = filtered[0]
            }
            resolve(user)
        })
    }
    
}