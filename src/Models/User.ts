export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthDate: string,
        private password: string
    ){}

    getId (): string {
        return this.id;
    }

    getName (): string {
        return this.name
    }

    getEmail (): string {
        return this.email
    }

    getBirthDate (): string {
        return this.birthDate
    }

    getPassword (): string {
        return this.password
    }
}