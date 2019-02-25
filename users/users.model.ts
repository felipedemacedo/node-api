const users = [
    {name: 'user 1', email: 'firs@mail.com'},
    {name: 'user 2', email: 'second@mail.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }
}