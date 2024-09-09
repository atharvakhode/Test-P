const loginvalidation=(values)=>{
    let errors={}
    if(!values.userEmail){
        errors.userEmail="User id is required"
    }
    if(!values.password){
        errors.password="Password is required"
    }    
    return errors;
}

export default loginvalidation;