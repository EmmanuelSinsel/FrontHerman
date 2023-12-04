//LOGIN
export class login{
    email: string = ""
    password: string = ""
    type: string = ""
    token: string = ""
}
//PASSWORD RECOVER
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
export class fields{
    table: string = ""
}
export class search{
    where: string = ""
}
//REGISTER
export class register{
    account_number: string = ""
    user: string = ""
    password: string = ""
    group: string = ""
    carreer: string = ""
    first_name: string = ""
    last_name: string = ""
    phone: string = ""
    email: string = ""
    state: string = "1"
    library_id: string = ""
}

//LOANS
export class loan{
    id_alumn: string = ""
    id_book: string = ""
    date_transaction: string = ""
    date_deadline: string = ""
    date_return: string = ""
    notation: string = ""
    id_library: string = ""
    state: string = "1"
}