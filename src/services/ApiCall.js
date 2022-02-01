    
export class ApiCall{
    static fetch = async() =>{
        const  data  = await fetch('https://reqres.in/api/users?page=1');
        return data;
    };
}


