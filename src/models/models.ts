export class login{
    email: string = ""
    password: string = ""
    type: string = ""
    token: string = ""
}
export class password_recover{
    email: string = ""
    type: string = ""
}
export class recover_data{
    token: string = ""
    type: string = ""
}
export class reset_password{
    token: string = ""
    password: string = ""
    confirm_password: string = ""
}
export class token_data{
    token: string = ""
}