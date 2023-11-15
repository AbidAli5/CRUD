export interface CustomerModel {
id: number,
first_name: string,
last_name:string,
email: string,
phone: string,
address : {
    street: string,
    city: string,
    state: string,
    zip_code: number
}
}
