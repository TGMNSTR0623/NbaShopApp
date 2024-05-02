import axios from "axios";

const instance = axios.create({
baseURL:"http://127.0.0.1:8000",
timeout:1000
})

export async function login (email,password) {
return instance.post("/login/", {
    email:email,
    password:password
})
}
export async function ProductList(){
    return instance.get("/productlist/",)
}


export async function register(data){
    return instance.post("register/",data)
}
