import  { useEffect, useState } from 'react';
 type length = number 
type validation = {
    isEmpty: boolean,
    maxLength: length ,
    minLength: length,
    isLink?:boolean
}

interface ReturnValid {
    isEmpty:boolean,
    isMaxLengthErr:boolean,
    isMinLengthErr:boolean,
    isLinkErr?:boolean,
    isValid:boolean,
    showText():string
}

const useValidation = (value:string,validations:validation,isFocus:boolean):ReturnValid => {



    const [isEmpty,setEmpty] = useState<boolean>(false);
    const [isMaxLengthErr,setMaxLengthErr] = useState<boolean>(false);
    const [isMinLengthErr,setMinLengthErr] = useState<boolean>(false);
    const [isLinkErr,setLinkErr] = useState<boolean>(false);
    const [isValid,setValid] = useState<boolean>(false);

    useEffect(() => {

        for (const validation in validations) {
            switch(validation){
                case 'maxLength' :
                    value.length >= validations[validation] ? setMaxLengthErr(true):setMaxLengthErr(false);
                    break;
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthErr(true):setMinLengthErr(false);
                    break;
                case "isEmpty":
                    value? setEmpty(false):setEmpty(true);
                    break;

                case 'isLink':
                    const reg = /(((https?:\/\/)|(www\.))[^\s]+)/g;
                    reg.test(String(value).toLowerCase()) ? setLinkErr(false):setLinkErr(true);
                    break;


                    default:
                        console.log('defoult');
                    break;
            }


        }


    },[value,validations]);

 
    useEffect(() => {
        const valid = isEmpty || isMaxLengthErr || isMinLengthErr || isLinkErr;
        if(valid){
           setValid(false) 
        }else{
            setValid(true);
        }
    

    },[isEmpty,isMaxLengthErr,isMinLengthErr,isLinkErr])
    
    const showText = () => {
        const message = isFocus && isEmpty
        ? "Заполните это поле"
        : "" || (isFocus && isMaxLengthErr)
        ? `Текст должен быть не более 200 симв.  Длина текста сейчас:${value.length} символ`
        : "" || (isFocus && isMinLengthErr)
        ? `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length} символ`
        : ""
        || (isFocus && isLinkErr)?'Введите URL':'';

        return message 

    }

    return {
        isEmpty,
        isMaxLengthErr,
        isMinLengthErr,
        isLinkErr,
        isValid,
        showText
    }
};

export default useValidation;